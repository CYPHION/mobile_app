import { useStripe } from '@stripe/stripe-react-native';
import { default as React, useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AccordionItem from '../../components/base/Accordion';
import MyCheckBox from '../../components/base/CheckBox';
import CustomButton from '../../components/base/CustomButton';
import DropdownComponent from '../../components/base/CustomDropDown';
import GridTable from '../../components/base/GridTable';
import InputField from '../../components/base/InputField';
import LoadingScreen from '../../components/base/LoadingScreen';
import { API } from '../../network/API';
import { globalData } from '../../store/thunk';
import { Color } from '../../utils/color';
import { FontSizes } from '../../utils/font';
import { calculateFee, customToast, formattedDate, getParentDropdown, screenDimensions } from '../../utils/functions';
import { GlobalStyles } from '../../utils/globalStyles';
import FeeSkeleton from './FeesSkeleton';


const summaryInitial = {
    totalOfChilds: 0,
    bookDues: 0,
    classDues: 0,
    extraPaid: 0,
    totalDues: 0,
    weeklyFee: 0,
}

const initialData = {
    payType: 'Cash',
    noOfWeeks: '1',
    noOfMonths: '1',
    paidAmount: '0',
    duesAmount: '0',
    feeWaived: '0',
    remarks: '',
    showOnReceipt: false,
}

const data = [
    { name: "Pay By Family", value: "Parent" },
    { name: "Pay By Student", value: "Student" },
    { name: " Pay Dues", value: "Dues" },
    { name: "Pay Book Dues", value: "bookDues" },

];

const FeeCollection = () => {
    const [activeItem, setActiveItem] = useState(null);
    const [option, setOption] = useState("");
    const [studentId, setStudentId] = useState("")
    const [error, setError] = useState('')
    const [dropdownData, setDropdownData] = useState([])
    const [isLoadingChange, setIsLoadingChange] = useState(false)
    const [childs, setChilds] = useState([])
    const [schedule, setSchedule] = useState([])
    const [dateails, setDateails] = useState([])
    const [recieptNo, setRecieptNo] = useState(1)
    const [isOnlyBooster, setIsOnlyBooster] = useState(false)
    const [summary, setSumamry] = useState(summaryInitial);
    const [totalChargesOfAllStudents, setTotalChargesOfAllStudents] = useState(0);
    const [formData, setFormData] = useState(initialData)
    const [invoiceData, setInvoiceData] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [sendData, setSendData] = useState({})
    const globaldata = useSelector(state => state?.global?.data)
    const user = useSelector(state => state?.user?.data)
    const dispatch = useDispatch()
    const { initPaymentSheet, presentPaymentSheet, confirmPaymentSheetPayment } = useStripe()


    let weekly = childs?.filter(elem => elem?.feeChargedBy === "Weekly" || elem?.feeChargedBy === "Hourly")?.map(elem => elem)
    let monthly = childs?.filter(elem => elem?.feeChargedBy === "Monthly")?.map(elem => elem)
    let total = (Number(summary?.bookDues) + Number(summary?.classDues) + Number(summary?.boosterDues) + totalChargesOfAllStudents) - (Number(summary?.extraPaid + Number(formData?.feeWaived)))
    let extra = (formData?.paidAmount || 0) - total;
    let getData = ((summary.totalDues === 0 && option === "Dues") || (summary.bookDues === 0 && option === "bookDues")) ? false : true
    let extrasDues;
    option === "Dues"
        ? (extrasDues =
            formData.duesAmount > summary?.totalDues
                ? `${formData.duesAmount - summary?.totalDues} Extra`
                : `${Number(summary?.totalDues) - Number(formData.duesAmount)}`
        )
        : (extrasDues =
            formData.duesAmount > summary?.bookDues
                ? `${formData.duesAmount - summary?.bookDues} Extra`
                : `${Number(summary?.bookDues) - Number(formData.duesAmount)}`);


    const getType = (isMonthly, value, child) => {
        const date = child?.dueFeeDate ? child?.dueFeeDate : child?.startDate

        return calculateFee(child, Number(value), isMonthly, date, true)
    }

    const toggleItem = (index) => {
        setActiveItem(activeItem === index ? null : index);
    };

    const getChilds = async (id) => {
        try {
            const res = await API.getStudentScheduledByParentId(id);
            if (res?.data?.students?.length === 0 || res?.data?.schedules.length === 0) {
                const childs = await API.getStudentWithActiveBooster(`parentId=${id}`)
                let activeBoosterStudents = []

                childs.data.forEach(child => child.BoosterStudents.length > 0 && activeBoosterStudents.push(child))

                if (activeBoosterStudents.length > 0) {
                    setChilds(activeBoosterStudents)
                    setIsOnlyBooster(true)
                } else {
                    customToast("error", 'No schedule or booster found for the students');
                }

            } else {
                const filteredStudentsforSchedule = res?.data?.students?.filter(student =>
                    !res?.data?.schedules.some(schedule => schedule.studentId === student.id)
                );

                const filteredStudents = res?.data?.students?.filter(student =>
                    res?.data?.schedules.some(schedule => schedule.studentId === student.id)
                );

                if (option === "Parent") {
                    // Check if there are students without schedules
                    if (filteredStudentsforSchedule.length > 0) {
                        customToast("error", 'Some students do not have schedules')
                    }
                }


                filteredStudents.sort(customSort);

                const result = {
                    students: filteredStudents,
                    schedules: res?.data.schedules,
                };

                setChilds(result?.students);
                setSchedule(result?.schedules);
            }
        } catch (err) {
            customToast("error", err?.message);
        } finally {
            setIsLoadingChange(false);
        }
    };

    const getStudentDetails = async (id) => {
        const data = await API.getAllStudentScheduleByIdWithBooster(id).then(res => res?.data).catch(err => customToast("error", err.message)).finally(() => setIsLoadingChange(false))
        if (data?.length === 0) {
            const child = await API.getStudentWithActiveBooster(`id=${id}`)

            if (child?.data && child?.data[0]?.BoosterStudents?.length > 0) {
                setChilds(child.data)
                setIsOnlyBooster(true)
            } else {
                setIsOnlyBooster(false)
                customToast("error", 'No schedule or booster found for this student')
                handleReset()
            }
        }
        else {
            setIsOnlyBooster(false)
            setChilds([data[0]?.Student])
            setSchedule(data)
        }
    }

    const handleReset = () => {
        setFormData(initialData)
        setChilds([])
        setSchedule([])
        setError({})
        setIsLoadingChange(false)
        setStudentId("")
        return
    }

    const handlefunctionAccToTab = (id, options) => {
        setIsLoadingChange(true)
        if (!id) {
            setChilds([])
            setSchedule([])
            setError({})
            setIsLoadingChange(false)
            return
        }
        else {
            if (options === "Student") {
                const parentId = globaldata?.students?.find(elem => elem.id === id)?.parentId
                getStudentDetails(id)
                parentFeeDetail(parentId)
            }
            else {
                getChilds(id)
                parentFeeDetail(id)
            }
        }

    }

    const parentFeeDetail = async (id) => {
        try {
            const res = await API.getPrentFeeDetail(id);
            const parentDetails = {
                bookDues: Number(res.data[0]?.bookDues),
                classDues: Number(res.data[0]?.classDues),
                extraPaid: Number(res.data[0]?.extraPaid),
                boosterDues: Number(res.data[0]?.boosterDues),
                totalDues: Number(res.data[0]?.totalDues),
                weeklyFee: Number(res.data[0]?.weeklyFee)
            };

            setSumamry(parentDetails);
        } catch (err) {
            customToast("error", err?.message);
        }
    };

    const onChangeHandler = (name, text) => {
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: text
        }));

    };

    const getInvoiceData = async () => {
        const data = await API.getAllInvoice().then(res => res?.data).catch(err => customToast("error", err?.message))
        if (data?.length === 0) {
            setRecieptNo(1)
        }
        else {
            if (data?.length > 0) {
                const reverse = data?.length > 0 && data?.reverse && data?.reverse()
                reverse && setRecieptNo(reverse[0]?.id + 1)
            }
            else {
                null
            }

        }
    }

    const customSort = (a, b) => {
        const hasBoosterA = a?.BoosterStudents?.length > 0;
        const hasBoosterB = b?.BoosterStudents?.length > 0;

        // Sort students with BoosterStudents to the end
        if (hasBoosterA && !hasBoosterB) {
            return 1;
        } else if (!hasBoosterA && hasBoosterB) {
            return -1;
        } else {
            // For other cases, maintain the original order
            return 0;
        }
    };

    const subjectsData = (childId) => {
        return schedule
            ?.filter((data) => data.studentId === childId && !data.isComp)
            .map((filteredData) => (
                <Text fontWeight={600} fontSize={'0.8rem '}>
                    {`${filteredData.Subject?.name} at ${filteredData.days}${'\n'}from ${filteredData.LessonTiming?.time}${'\n'}(${filteredData?.isBooster ? 'Booster Scheudule' : 'Regular Schedule'})${'\n'}${'\n'}`}
                </Text>
            ))
    };

    const getStudentRowData = (child) => {
        const isMonthly = child?.feeChargedBy === "Monthly"
        const timeperiod = isMonthly ? formData.noOfMonths : formData.noOfWeeks

        const obj = getType(isMonthly, timeperiod, child)

        const isBooster = child?.BoosterStudents?.length > 0 ? true : false
        const booster = child?.BoosterStudents.length > 0 ? child?.BoosterStudents[0] : {}

        const regularScheduleLength = schedule?.filter(elem => elem.studentId === child.id && elem.isBooster === false)?.length > 0 ? true : false

        const newBoosterarr = [
            { id: 13, "name": "Total Booster Price", "value": `£${booster?.totalPackagePrice}` },
            { id: 14, "name": "Booster Dues", "value": `£${booster?.totalPackagePrice - booster?.paidAmount}` },
            { id: 15, "name": "Total Booster Weeks", "value": `${child?.BoosterStudents[0]?.numOfWeeks} weeks` },
        ]

        const onlyBoosterArr = [
            { id: 10, "name": "Book dues", "value": `£${Number(child?.bookDues)}` },
            ...(isBooster ? newBoosterarr : []),
            { id: 12, "name": "Total Charges", "value": `£${Number(obj.totalCharges) + Number(child?.bookDues) + Number(child?.boosterDues)}` }]

        const regularArr = [
            { id: 1, "name": "Start Date", "value": `${child?.dueFeeDate ? formattedDate(new Date(child?.dueFeeDate).setDate(new Date(child?.dueFeeDate).getDate() + 1), 'dd-MMMM-yyyy') : formattedDate(child?.startDate, 'dd-MMMM-yyyy')}` },
            { id: 2, "name": "End Date:	", "value": `${obj.endDate}` },
            { id: 3, "name": "Subjects", "value": subjectsData(child?.id) },
            { id: 4, "name": "Frozen Weeks", "value": `0` },
            {
                id: 5, "name": `${child.feeChargedBy === "Monthly" ? 'Total Months' : 'Total Week'}`
                , "value": `${child.feeChargedBy === "Monthly" ? formData?.noOfMonths : formData?.noOfWeeks}`
            },
            { id: 6, "name": "Total Lectures", "value": `${obj?.totalLectures}` },
            { id: 7, "name": "Total Hours", "value": `${obj.totalHours}` },
            { id: 8, "name": "Price per Hour", "value": `£${child?.isChildcareStd ? child?.StudentYear?.ratePerChildcareHour : child?.StudentYear?.ratePerHour}` },
            { id: 10, "name": "Book dues", "value": `£${Number(child?.bookDues)}` },
            { id: 11, "name": "Class Charges", "value": `£${isMonthly ? Number(child.monthlyFee) : Number(obj.classCharges)}` },
            ...(isBooster ? newBoosterarr : []),
            { id: 12, "name": "Total Charges", "value": `£${Number(obj.totalCharges) + Number(child?.bookDues) + Number(child?.boosterDues)}` }
        ]


        const duesArr = [
            { id: 2, "name": "Book dues", "value": `£${Number(child?.bookDues)}` },
            { id: 3, "name": "Booster dues", "value": `£${Number(child?.boosterDues)}` },
        ]

        let arr = []
        if (isBooster && regularScheduleLength) {
            arr = regularArr
        }
        else if (isBooster && !regularScheduleLength) {
            arr = onlyBoosterArr
        } else {
            arr = regularArr
        }

        switch (option) {
            case "Parent":
                return arr
            case "Student":
                return arr
            case "Dues":
                return duesArr
            case "bookDues":
                return duesArr
        }
    }

    const getTotalRowData = () => {
        const duesArr = [
            { id: 1, "name": "Total Previous dues", "value": `£${summary?.classDues}` },
            {
                id: 2, "name": "Total Book dues ", "value": `£${summary?.bookDues}`
            },
            {
                id: 3, "name": "Total Booster dues ", "value": `£${summary?.boosterDues}`
            },

        ]

        const bookDuesArr = [
            { id: 1, "name": option === "Dues" ? "Total Previous dues" : "Total Book dues", "value": option === "Dues" ? `£${summary?.classDues}` : `£${summary?.bookDues}` }
        ]

        const parentArr = [
            { id: 1, "name": "Total Charges of all Students", "value": `£${totalChargesOfAllStudents}` },
            { id: 2, "name": "Total Book dues	", "value": `£${summary?.bookDues}` },
            { id: 3, "name": "Total Booster dues	", "value": `£${summary?.boosterDues}` },
            { id: 4, "name": "Total Previous dues", "value": `£${summary?.classDues}` },
            { id: 5, "name": "Total Extra Paid of all Students", "value": `£${Number(summary?.extraPaid)}` },
        ]

        const studentArr = [
            { id: 1, "name": "Total Charges ", "value": `£${totalChargesOfAllStudents}` },
            { id: 2, "name": "Total Book dues	", "value": `£${summary?.bookDues}` },
            { id: 3, "name": "Total Booster dues	", "value": `£${summary?.boosterDues}` },
            { id: 4, "name": "Total Previous dues", "value": `£${summary?.classDues}` },
            { id: 5, "name": "Total Extra Paid", "value": `£${Number(summary?.extraPaid)}` },
        ]

        switch (option) {
            case "Parent":
                return parentArr
            case "Student":
                return studentArr
            case "Dues":
                return duesArr
            case "bookDues":
                return bookDuesArr
        }
    }

    const handleSubmit = () => {
        setIsLoading(true)

        const remarks = formData.showOnReceipt ? formData?.remarks : ''

        let casherName = user?.firstName + ' ' + user.lastName

        const onlyBoosterFee = formData.isBoosterPaid

        let formofParent = {
            parentId: user?.id,
            amountPaid: Number(formData.paidAmount),
            payBy: 'card',
            noOfMonths: Number(formData?.noOfMonths),
            noOfWeeks: Number(formData?.noOfWeeks),
            feeWaived: Number(formData?.feeWaived),
            remarks: remarks,
            isBooster: true,
            payType: 'regular',
            byCardAmount: Number(formData.paidAmount),
            byCashAmount: 0,
            byBankAmount: 0,
            invoice: {
                document: ''
            }
        }

        let formOfStudent = {
            studentId: studentId,
            amountPaid: Number(formData.paidAmount),
            payBy: 'card',
            timeperiod: Number(formData.noOfMonths) !== 0 ? Number(formData.noOfMonths) : Number(formData.noOfWeeks),
            feeWaived: Number(formData?.feeWaived),
            remarks: remarks,
            payType: 'regular',
            isBooster: true,
            onlyBoosterFee: onlyBoosterFee,
            byCardAmount: Number(formData.paidAmount),
            byCashAmount: 0,
            byBankAmount: 0,
            invoice: {
                document: ''
            }
        }

        let payDues = {
            parentId: user?.id,
            payBy: 'card',
            payType: 'dues',
            feeWaived: Number(formData?.feeWaived),
            amountPaid: Number(formData.duesAmount),
            remarks: remarks,
            byCardAmount: Number(formData.duesAmount),
            byCashAmount: 0,
            byBankAmount: 0,
            invoice: {
                document: ''
            }

        }

        let bookDues = {
            parentId: user?.id,
            payBy: 'card',
            payType: 'book',
            feeWaived: Number(formData?.feeWaived),
            amountPaid: Number(formData.duesAmount),
            onlyBook: true,
            remarks: remarks,
            byCardAmount: Number(formData.duesAmount),
            byCashAmount: 0,
            byBankAmount: 0,
            invoice: {
                document: ''
            }
        }

        let sendFOrmData
        if (option === "Parent") {
            sendFOrmData = formofParent
        } else {

            if (option === "Student") {
                sendFOrmData = formOfStudent
            }
            else {

                if (option === "Dues") {

                    sendFOrmData = payDues
                }
                else {
                    sendFOrmData = bookDues
                }
            }
        }


        if (option === 'Parent' || option === "Student") {
            if (!sendFOrmData.payBy || sendFOrmData.amountPaid === 0) {
                setError(prev => ({
                    ...prev,
                    paidAmount: sendFOrmData.amountPaid === 0 ? "Paid Amount cannot be zero" : "",
                    payType: !sendFOrmData.payBy ? "Paytype cannot be empty" : ""
                }))
                return (
                    !sendFOrmData.payBy && customToast("error", 'Paytype cannot be empty'),
                    sendFOrmData.amountPaid === 0 && customToast("error", 'Paid Amount cannot be zero'),
                    setIsLoading(false)
                )
            } else if (option === "Parent" && !sendFOrmData.noOfMonths && !sendFOrmData.noOfWeeks) {
                return customToast("error", 'No of months and No of weeks both cannot be zero or empty')
            } else if (option === "Student" && !sendFOrmData.timeperiod) {
                console.log('e')
                return customToast("error", 'No of months and No of weeks both cannot be zero or empty')
            }
        } else {
            if (option === "Dues" || option === "bookDues") {
                sendFOrmData.amountPaid === 0 && customToast("error", 'Dues Amount cannot be zero')
                return
            }
        }

        setSendData(sendFOrmData)
        handleFormDataForStripe(sendFOrmData, recieptNo, casherName, true)


    }

    const handleFormDataForStripe = async (sendFOrmData, recieptNo, casherName, isStripe = false) => {
        if (option === "Parent") {
            const parentMainId = user?.mainId
            let form = {
                titleHead: option,
                parentId: parentMainId,
                amountPaid: formData.paidAmount,
                remarks: formData.remarks,
                showOnReceipt: formData.showOnReceipt,
                noOfWeeks: formData.noOfWeeks,
                noOfMonths: formData.noOfMonths,
                totalPayment: totalChargesOfAllStudents,
                extra: extra,
                recieptNo: recieptNo,
                dateails: dateails,
                cashierName: casherName,
                summary: summary,
                feeWaived: formData.feeWaived,
                duesAmount: formData.duesAmount,
                byCardAmount: formData.paidAmount,
                byCashAmount: 0,
                byBankAmount: 0,
            }
            setInvoiceData(form)
            await handlePayNwow({ ...sendFOrmData, option }, form)
        }
        else {
            if (option === "Student") {
                const parentMainId = user?.mainId
                let form = {
                    titleHead: option,
                    parentId: parentMainId,
                    amountPaid: formData.paidAmount,
                    remarks: formData.remarks,
                    showOnReceipt: formData.showOnReceipt,
                    noOfWeeks: formData.noOfWeeks,
                    noOfMonths: formData.noOfMonths,
                    totalPayment: totalChargesOfAllStudents,
                    extra: extra,
                    recieptNo: recieptNo,
                    dateails: dateails,
                    cashierName: casherName,
                    summary: summary,
                    feeWaived: formData.feeWaived,
                    duesAmount: formData.duesAmount,
                    byCardAmount: formData.paidAmount,
                    byCashAmount: 0,
                    byBankAmount: 0,
                }
                setInvoiceData(form)
                await handlePayNwow({ ...sendFOrmData, option }, form)
            }
            else {
                let extras
                option === "Dues" ? (
                    extras = formData.duesAmount > summary?.totalDues ?
                        `${formData.duesAmount - summary?.totalDues}` :
                        `${Number(summary?.totalDues) - Number(formData.duesAmount)}`
                ) : (
                    extras = formData.duesAmount > summary?.bookDues ?
                        `${formData.duesAmount - summary?.bookDues}` :
                        `${Number(summary?.bookDues) - Number(formData.duesAmount)}`
                )
                const parentMainId = user?.mainId
                let form = {
                    titleHead: option === "Dues" ? option : "Book Dues",
                    parentId: parentMainId,
                    amountPaid: formData.paidAmount,
                    remarks: formData.remarks,
                    showOnReceipt: formData.showOnReceipt,
                    noOfWeeks: formData.noOfWeeks,
                    noOfMonths: formData.noOfMonths,
                    totalPayment: totalChargesOfAllStudents,
                    extra: extras,
                    recieptNo: recieptNo,
                    dateails: dateails,
                    cashierName: casherName,
                    summary: summary,
                    feeWaived: formData.feeWaived,
                    duesAmount: formData.duesAmount,
                    byCardAmount: formData.duesAmount,
                    byCashAmount: 0,
                    byBankAmount: 0,
                }
                setInvoiceData(form)
                await handlePayNwow({ ...sendFOrmData, option }, form)
            }

        }
    }

    const handlePayNwow = async (data, invoiceData) => {

        // 1.Create a Payment intent
        let res = await API.stripeIntent({ amount: data?.amountPaid })
        const intent = await API.createIntent({ ...data, category: data?.option === "bookDues" ? "BookDues" : data?.option, intentId: res?.data?.id, noOfMonth: data?.noOfMonths, noOfWeek: data?.noOfWeeks, invoiceData })
        const { client_secret: clientSecret } = res?.data
        // 2. Initialize the payment sheet

        const initResponse = await initPaymentSheet({
            merchantDisplayName: 'Mr.JD',
            paymentIntentClientSecret: clientSecret,
        })
        if (initResponse.error) {
            customToast("error", initResponse.error)
            return;
        }


        // 3. Present payment sheet
        const paymentResult = await presentPaymentSheet({
            clientSecret
        });

        if (paymentResult?.error) {
            customToast("error", paymentResult?.error?.message)
            setIsLoading(false)
            return
        } else {
            await API.IntentSuccessURL(res?.data?.id).then(res => {

                customToast("success", res.message)
                console.log("successss---->", res)

            }).catch(err => {
                customToast("error", err?.message)
                console.log("error---->", err)
            }).finally(() => {
                console.log("finally---->")
                setIsLoading(false)
                dispatch(globalData(user?.id))
                handleReset()
            })
        }


    }

    useEffect(() => {
        const childDetails = [];

        const allCharges = childs?.reduce((sum, child) => {
            const isMonthly = child.feeChargedBy === "Monthly";
            const timePeriod = isMonthly ? formData.noOfMonths : formData.noOfWeeks;

            const isBooster = child?.BoosterStudents?.length > 0 && child.BoosterStudents[0]?.paidAmount === 0 ? true : false
            const regularScheduleLength = schedule?.filter(elem => elem.studentId === child.id && elem.isBooster === false)?.length > 0 ? true : false
            const chargesForChild = getType(isMonthly, timePeriod, child);
            const startDate = child.dueFeeDate ? formattedDate(new Date(child?.dueFeeDate).setDate(new Date(child?.dueFeeDate).getDate() + 1), 'dd-MMMM-yyyy') : formattedDate(child.startDate, 'dd-MMMM-yyyy');
            const endDate = chargesForChild.endDate;

            // Update childDetails with child name, startDate, and endDate
            childDetails.push({
                name: `${child.fullName} ${isMonthly ? '(Monthly)' : '(Weekly)'}`,
                feeChargedBy: child.feeChargedBy,
                startDate,
                endDate,
                isChildcare: child.isChildcareStd,
                isBooster: isBooster,
                regularScheduleLength: regularScheduleLength,
                BoosterDetail: child?.BoosterStudents.length > 0 && child?.BoosterStudents[0]
            });

            childs?.length === 1 && !regularScheduleLength ? setIsOnlyBooster(true) : setIsOnlyBooster(false)
            if (option === "Student") {

                setSumamry({
                    totalOfChilds: chargesForChild.totalCharges,
                    bookDues: chargesForChild.bookCharges,
                    classDues: chargesForChild.classDues,
                    totalDues: chargesForChild.classDues,
                    extraPaid: summary.extraPaid,
                    boosterCharges: chargesForChild.boosterCharges,
                    boosterDues: chargesForChild.boosterDues,
                    totalPayment: chargesForChild.totalCharges
                })
            }
            return sum + chargesForChild.totalCharges;
        }, 0);

        setDateails([...childDetails]);

        setTotalChargesOfAllStudents(allCharges);
    }, [childs, formData.noOfWeeks, formData.noOfMonths]);


    useEffect(() => {
        getInvoiceData()

        if (childs?.length > 0) {

            if (!weekly.length) {
                setFormData(prev => ({
                    ...prev,
                    noOfWeeks: '0',
                    noOfMonths: '1'
                }))
            }
            else {
                if (!monthly.length) {
                    monthly.length === 0 && setFormData(prev => ({
                        ...prev,
                        noOfMonths: '0',
                        noOfWeeks: '1'
                    }))
                }

            }

        }
    }, [childs]);

    useEffect(() => {
        if (option === 'Student') {
            const data = globaldata?.students?.filter(elem => elem.mainId !== null)
            setDropdownData(data)
        }
    }, [option])

    useEffect(() => {
        if (!getData && (option === "Dues" || option === "bookDues")) {
            customToast("error", `No ${option === "Dues" ? option : "Book Dues"} found`)
        }
    }, [summary])


    const renderFields = () => {

        return (
            childs?.length >= 1 ?
                <View >
                    {
                        childs && childs?.map((child, index) => {
                            const isBooster = child?.BoosterStudents?.length > 0 ? true : false
                            return (
                                <View style={[GlobalStyles.p_10]} key={index}>
                                    <AccordionItem
                                        children={<GridTable key={child.id} data={getStudentRowData(child)} ids={[13, 14, 15]} />}
                                        key={child.id}
                                        date={`${child.feeChargedBy === "Monthly" ? "(Monthly)" : "(Weekly)"} ${isBooster ? "Booster Student" : ""}`}
                                        studentName={child.status}
                                        total={`${child?.fullName} `}
                                        expanded={activeItem === index}
                                        onToggle={() => toggleItem(index)} // Pass toggle function to each item
                                    />
                                </View>
                            )
                        })
                    }

                    {
                        option === "Student" && <View style={[GlobalStyles.headerStyles]}>
                            <Text style={GlobalStyles.headerTextStyle}>Student Fees</Text>
                        </View>
                    }
                    <View style={[GlobalStyles.p_10]}>
                        {/* <InputField
                        label={"Payment type"}
                        inputMode={"text"} // from here you can change type of input field ['none','text','decimal','numeric','tel','search','email','url']
                        value={formData.paymentType}
                    // onChangeText={(text) => onChangeHandler('paymentType', text)}
                    /> */}
                        {((option === "Parent" || option === "Student") && !isOnlyBooster) ? <>
                            {
                                weekly?.length > 0 ? <InputField
                                    label={"Number of weeks (Required)"}
                                    inputMode={"numeric"} // from here you can change type of input field ['none','text','decimal','numeric','tel','search','email','url']
                                    value={formData.noOfWeeks}
                                    onChangeText={(text) => onChangeHandler('noOfWeeks', text)}
                                /> : null
                            }
                            {
                                monthly?.length > 0 ? <InputField
                                    label={"Number of months (Required)"}
                                    inputMode={"numeric"} // from here you can change type of input field ['none','text','decimal','numeric','tel','search','email','url']
                                    value={formData.noOfMonths}
                                    onChangeText={(text) => onChangeHandler('noOfMonths', text)}
                                /> : null
                            }
                        </> : null}

                        {option === "Parent" || option === "Student" ? <InputField
                            label={"Paid Amount (Required)"}
                            maxLength={5}
                            inputMode={"numeric"} // from here you can change type of input field ['none','text','decimal','numeric','tel','search','email','url']
                            value={formData.paidAmount}
                            onChangeText={(text) => onChangeHandler('paidAmount', text)}
                        /> : <InputField
                            label={"Dues Amount (Required)"}
                            maxLength={5}
                            inputMode={"numeric"} // from here you can change type of input field ['none','text','decimal','numeric','tel','search','email','url']
                            value={formData.duesAmount}
                            onChangeText={(text) => onChangeHandler('duesAmount', text)}
                        />}

                        <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}><MyCheckBox isChecked={formData?.showOnReceipt} onToggle={() => onChangeHandler('showOnReceipt', !formData?.showOnReceipt)} />
                                <Text style={{ color: Color.text }}>Remarks Show on Receipt?</Text>
                            </View>
                            {

                                option === "Student" && childs[0]?.BoosterStudents[0]?.paidAmount === 0 && <View style={{ flexDirection: 'row', alignItems: 'center' }}><MyCheckBox isChecked={formData.isBoosterPaid} onToggle={() => onChangeHandler('isBoosterPaid', !formData?.isBoosterPaid)} />
                                    <Text style={{ color: Color.text }}>Pay Only Booster Fee</Text>
                                </View>
                            }
                        </View>
                        <InputField
                            label={"Remarks"}
                            multiline={true}
                            inputMode={"text"} // from here you can change type of input field ['none','text','decimal','numeric','tel','search','email','url']
                            value={formData.remarks}
                            onChangeText={(text) => onChangeHandler('remarks', text)}
                        />
                    </View>
                    <View style={[GlobalStyles.headerStyles]}>
                        <Text style={GlobalStyles.headerTextStyle}>Charges</Text>
                        <Text style={GlobalStyles.headerTextStyle}>Amount</Text>
                    </View>
                    <View style={GlobalStyles.p_10}>
                        <GridTable data={getTotalRowData()} />
                    </View>
                    <View style={[GlobalStyles.headerStyles]}>
                        <Text style={GlobalStyles.headerTextStyle}>Total Amount (Charges + Dues)</Text>
                        <Text style={GlobalStyles.headerTextStyle}>&pound;{`${(option === "Parent" || option === "Student") ? `${Math.abs(extra)} ${extra > 0 ? 'Extra' : ''}` : option === "Dues" ? extrasDues : extrasDues}`}</Text>
                    </View>
                    <View style={[styles.btnView]}>
                        <CustomButton
                            title={'Pay Now'}
                            variant='fill'
                            onPress={handleSubmit}
                            isLoading={isLoading}
                            disabled={isLoading}
                        />
                    </View>
                </View >
                : null
        )
    }


    return (

        <>
            <SafeAreaView style={{ flex: 1 }} >
                {(!!globaldata?.students && !!user?.email) ? <>

                    <View style={{ paddingHorizontal: 10, alignItems: 'center' }}>
                        <DropdownComponent
                            dropdownStyle={{ width: screenDimensions.width * 0.95 }}
                            disable={false}
                            data={data}
                            placeHolderText={"Select Option"}
                            value={option}
                            setValue={text => {
                                setOption(text);
                                handleReset()
                                if (text !== "Student") {
                                    handlefunctionAccToTab(user?.id, text); // Pass the updated option to the function
                                }
                            }}
                        />
                    </View>

                    <LoadingScreen loading={isLoadingChange} />
                    <View style={{ paddingBottom: 50 }} >


                        <ScrollView>


                            {
                                !isLoadingChange &&
                                <View >
                                    {
                                        option === "Student" && <View style={{ paddingHorizontal: 10, alignItems: 'center' }}>
                                            <DropdownComponent
                                                dropdownStyle={{ width: screenDimensions.width * 0.95 }}
                                                disable={false}
                                                data={getParentDropdown(dropdownData)}
                                                placeHolderText={"Select student"}
                                                value={studentId}
                                                setValue={val => {
                                                    setStudentId(val)
                                                    handlefunctionAccToTab(val, option)
                                                }}
                                            />
                                        </View>
                                    }

                                    {getData && renderFields()}
                                </View>
                            }



                        </ScrollView>
                    </View>
                </> : <FeeSkeleton />}
            </SafeAreaView>
        </>
    )
}

export default FeeCollection;

const styles = StyleSheet.create({
    accordStyle: {
        borderBottomWidth: 1
    },
    AccordStyle: {
        borderBottomWidth: 1
    },

    btnView: {
        paddingHorizontal: 10,
        paddingVertical: 15,
    },
    inactivetext: {
        textAlign: 'center',
        color: Color.textTwo,
        fontSize: FontSizes.lg
    },

})