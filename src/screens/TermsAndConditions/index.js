import React from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import { Color } from '../../utils/color'
import { FontFamily, FontSizes } from '../../utils/font'
import { GlobalStyles } from '../../utils/globalStyles'

const TermsAndConditions = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView>
                <View>
                    <View style={[{ paddingHorizontal: 20 }, GlobalStyles.headerStyles]}>
                        <Text style={GlobalStyles.headerTextStyle}>General</Text>
                    </View>
                    <Text style={styles.content}>
                        The terms "you" "your" "customer" "parent/guardian" are referring to you. "We" "us"
                        "our" "Prime Tuition" "Organisation" "the Company" refer to Prime Tuition.{'\n'}{'\n'}
                        The admissions form & these terms and conditions constitute the contract between the parties being the student and/or his parents or guardian(s) and Prime Tuition.{'\n'}{'\n'}
                        The headings contained in the Agreement are for convenience only and do not affect their interpretation.
                    </Text>
                    <View style={[{ paddingHorizontal: 20 }, GlobalStyles.headerStyles]}>
                        <Text style={GlobalStyles.headerTextStyle}>Enrolment & Registration</Text>
                    </View>
                    <Text style={styles.content}>
                        Acceptance of a student for enrolment is at the discretion of Prime Tuition. A student must satisfy the requirements of Prime Tuition (by taking an assessment) that his or her level of work and behaviour have reached Prime Tuition standards. {'\n'}{'\n'}
                        By enrolling with Prime Tuition. the parent authorises Prime Tuition and/or its representatives to publish photographs and materials relating to the studenfs enrolment e.g., exam results. in all territories for the purposes of publicity and promotion without restriction unless otherwise explicitly agreed.{'\n'}{'\n'}
                        We may modify any of the terms and conditions within this Agreement at any
                        time and at our sole discretion, such change to be given at least 28 days' notice. If
                        any of the modifications are unacceptable to you, your only recourse is to terminate the student's enrolment at Prime Tuition. If your child is still enrolled at Prime Tuition beyond 28 days after the notice, it will be considered as your acceptance of the change.{'\n'}{'\n'}
                        Parents are required to notify the office of any change of address, contact details
                        & whether the student suffers from any medical conditions.
                    </Text>
                    <View style={[{ paddingHorizontal: 20 }, GlobalStyles.headerStyles]}>
                        <Text style={GlobalStyles.headerTextStyle}>Fees and Payment</Text>
                    </View>
                    <Text style={styles.content}>
                        A non-refundable admission fee of £5 for each admission.{'\n'}{'\n'}

                        A refundable deposit of £l00 (or l week deposit if your weekly fee is more
                        than £l00) charged at the time of admission. Refunded when the studenfs account is
                        closed at Prime Tuition by giving Four weeks early notice.{'\n'}.{'\n'}
                        Tuition fees must be paid in full and on time as specified in the payment schedule.{'\n'}{'\n'}
                        Fee calculated on anhourly tuition fee rate for weekly or monthly
                        basis which will vary depending on subject(s), level(s) etc. undertaken.{'\n'}{'\n'}
                        Minimum fee is 4 Weeks or 1 Month upfront (in
                        Advance) only. No students allowed entering in the class(s) without paying Advance
                        fee. {'\n'}{'\n'}
                        Weekly fee calculation is based on agreed days during a week instead of monthly
                        which means if your child attends any lessons 5 times in a month. you'II be
                        charged for 5 Weeks. If you agreed a monthly plan. Fee will be charged on monthly basis for a minimum
                        contractual term of 3 Months' enrolment period{'\n'}{'\n'}
                        You must have to pay the tuition fees for all the lessons even you have
                        reported us the absence of your child. If you have reported any absence. you'II be offered
                        makeup lessons in addition to the regular lessons during holidays. exam time or
                        any other alternative time which is acceptable for parent & Prime Tuition.{'\n'}{'\n'}
                        If fixed hours and tuition fees have been agreed, and either have been subsequently reduced: the hourly
                        tuition fee rate may increase, and any discount given may become invalid{'\n'}{'\n'}
                        Overdue payment charged at the full tuition fee rate with no discount. Late fees
                        may apply for overdue payments. {'\n'}{'\n'}
                        Parents claiming childcare cost will pay full payment rate according to childcare provision and age of
                        the child. The method of payment is via Bank only i.e. cheques, Direct Debit, on line transfer etc.{'\n'}{'\n'}
                        £3 for an ID card charged at the time of issuing card. Replacement cards for an
                        additional cost of £3. Administration charge of £1 for failing to produce ID card. {'\n'}{'\n'}
                        All stationery, including books and other writing materials will be charged
                        separately. (£3 to £5 for each books or Labelled Price on the books){'\n'}{'\n'}
                        Prime Tuition reserves the right to modify tuition fees from time to time (reasonable notice will be
                        given to the parties concerned).
                    </Text>
                    <View style={[{ paddingHorizontal: 20 }, GlobalStyles.headerStyles]}>
                        <Text style={GlobalStyles.headerTextStyle}>Refund & Adjustment in Fees</Text>
                    </View>
                    <Text style={styles.content}>
                        Initial Deposit will be refunded once you serve required notice which is 4 Weeks
                        in advance. If parent/guardian do not serve notice, deposit will not be refunded
                        and will be used to cover the cost of remaining period.{'\n'}{'\n'}

                        In rare cases Prime Tuition may refund the fees or momentarily freeze accounts
                        (so no payments would be deducted or made in future) for booked classes where
                        an unavoidable mishap has occurred directly affecting the student. This includes
                        but is not limited to injury, severe illness (which can cause 4 or more weeks absence), disability,
                        death or bereavement. Parent must provide Doctor's note as evidence for severe illness or injury.
                    </Text>
                    <View style={[{ paddingHorizontal: 20 }, GlobalStyles.headerStyles]}>
                        <Text style={GlobalStyles.headerTextStyle}>Attendance and Punctuality</Text>
                    </View>
                    <Text style={styles.content}>
                        Students are expected to attend all scheduled classes and arrive on time.{'\n'}{'\n'}
                        If a student is absent, it is their responsibility to catch up on missed material.{'\n'}{'\n'}
                        Makeup lessons will be offered for all authorised absence(s) only, during the
                        holidays, term breaks or any other convenient time which both parties are
                        agreed within same school term.{'\n'}{'\n'}
                        Any absence without 24 hours prior notice will be deemed unauthorised for which you still have to pay
                        but you won't get makeup lessons for it.{'\n'}{'\n'}
                        You must book makeup/compensation lessons during
                        the same Term (within 8 weeks) in an Academic year. Makeup lessons are not transferable to
                        the next School Term.{'\n'}{'\n'}
                        Makeup class(es) may be used for any subjects of the studenfs choice provided the student is enrolled
                        for that subject.{'\n'}{'\n'}
                        If a student is unable to attend catch-up lesson,
                        Prime Tuition will not offer further compensation for same missing hours. In case if
                        it is because of a medical condition, parents/guardians must need to present a GP/Doctor's letter to
                        get compensation second time{'\n'}{'\n'}
                        Compensation classes are not transferable to other child/children or siblings.{'\n'}{'\n'}
                        If you want to freeze tuition
                        lesson/s, a minimum of 4 weeks' notice is required
                        to Freeze the account. Any notice less than 4 weeks will not be undertaken and
                        security deposit will be reimbursed to cover the cost.
                    </Text>
                    <View style={[{ paddingHorizontal: 20 }, GlobalStyles.headerStyles]}>
                        <Text style={GlobalStyles.headerTextStyle}>Examinations Fees</Text>
                    </View>
                    <Text style={styles.content}>
                        Any internally assessed examination and computer-based examination fees
                        are payable by the student/parent and are non-refundable and non-transferable. {'\n'}{'\n'}
                        It is the responsibility of the student/parent(s) to ensure that exam entry form(s)
                        are completed 3 months prior to the start of the examination period. Prime Tuition will endeavour
                        to display relevant exam entry deadlines for each exam body on its notice boards.{'\n'}{'\n'}
                        Makeup lessons will be offered for all authorised absence(s) only, during the
                        holidays, term breaks or any other convenient time which both parties are
                        agreed within same school term.{'\n'}{'\n'}
                        Exam entry(s) should clearly state each exam(s) the student would like to be entered for.{'\n'}{'\n'}
                        It is the responsibility of the student/parent(s) to ensure exam entries are processed in a
                        timely manner and to obtain a statement of entry before the deadline from the Exams Office. {'\n'}{'\n'}
                        Makeup class(es) may be used for any subjects of the studenfs choice provided the student is enrolled
                        for that subject.{'\n'}{'\n'}
                        Student/parent(s) will be charged late entry fee if forms are submitted after the deadline.{'\n'}{'\n'}
                        Acceptance of any exam entries is at the absolute discretion of Prime Tuition.
                        For more information about exams and fees please visit our website,
                        www.primetuition.co.uk.

                    </Text>
                    <View style={[{ paddingHorizontal: 20 }, GlobalStyles.headerStyles]}>
                        <Text style={GlobalStyles.headerTextStyle}>Conduct and Discipline</Text>
                    </View>
                    <Text style={styles.content}>
                        Students must conduct themselves respectfully and follow all academy rules and policies.{'\n'}{'\n'}
                        Disruptive behavior may result in disciplinary action, including expulsion.
                    </Text>
                    <View style={[{ paddingHorizontal: 20 }, GlobalStyles.headerStyles]}>
                        <Text style={GlobalStyles.headerTextStyle}>Concessions</Text>
                    </View>
                    <Text style={styles.content}>
                        Prime Tuition may award at its absolute discretion concessions for staff with
                        children studying at Prime Tuition and/or parents with more than 1 student enrolled at Prime Tuition.

                    </Text>
                    <View style={[{ paddingHorizontal: 20 }, GlobalStyles.headerStyles]}>
                        <Text style={GlobalStyles.headerTextStyle}>Intellectual Property</Text>
                    </View>
                    <Text style={styles.content}>
                        All course materials, including textbooks, handouts and online content are protected by copyright and
                        may not be reproduced or distributed without permission.
                    </Text>
                    <View style={[{ paddingHorizontal: 20 }, GlobalStyles.headerStyles]}>
                        <Text style={GlobalStyles.headerTextStyle}>Privacy and Data Protection</Text>
                    </View>
                    <Text style={styles.content}>
                        The organisation will collect and process personal information in accordance with our privacy policy.
                        {'\n'}{'\n'}
                        Student's personal information will be kept confidential. Parent's consent to
                        Prime Tuition obtaining, processing. and holding "personal data" including
                        "sensitive personal data" such as medical information to be processed lawfully
                        and fairly in accordance with the Data Protection Act 1998, for the purposes of
                        safeguarding and promoting the welfare of the student(s) and ensuring that all
                        relevant legal obligations of Prime Tuition and parents are complied with.
                    </Text>
                    <View style={[{ paddingHorizontal: 20 }, GlobalStyles.headerStyles]}>
                        <Text style={GlobalStyles.headerTextStyle}>Web and Newsletter Publishing / General Display</Text>
                    </View>
                    <Text style={styles.content}>
                        At times filming and photographs of student at Prime Tuition are used on our web page, in the
                        newsletter, on general display in classrooms, in the school or as a school promotion. Newsletters are
                        placed on the website weekly, inclusive of photos that consent has been received for their publication.
                        Names are not published on the web in conjunction with photographs identifying students, however, names
                        of brilliant students may be used from time to time in the school newsletter and to display work. At the
                        time of whole school photos, student names and photos are included in the photographic package offered.
                        {'\n'}{'\n'}
                        Prime Tuition regularly obtain and use video footage/photos/other images of children/students for a
                        variety of promotional activities, including for publications, promotional material, websites, and
                        advertisements.
                    </Text>
                    <View style={[{ paddingHorizontal: 20 }, GlobalStyles.headerStyles]}>
                        <Text style={GlobalStyles.headerTextStyle}>Termination of Enrollment</Text>
                    </View>
                    <Text style={styles.content}>
                        The organisation reserves the right to terminate a student's enrollment for reasons including but not
                        limited to non-payment, violation of policies, or disruptive behavior.{'\n'}{'\n'}
                        If parents/guardian wish to terminate the contract within first 12
                        Weeks, Prime Tuition will charge an early cancellation payment of £10 as an admin
                        fee.{'\n'}{'\n'}
                        We reserve the right to cancel an enrolment immediately and allocate the place to another applicant in
                        cases of non-payment of tuition fees, 2 weeks unauthorised absence, unacceptable misconduct (on
                        part of the student/parent or representative of the student or parent), if the performance of student is
                        not satisfactory due to lack of effort or due to any material breach of contract by the student or
                        parent.{'\n'}{'\n'}
                        No fees or deposits
                        will be refunded where a student’s enrolment has been cancelled because of student/parent’s
                        breaching rules of Prime Tuition or parent wants to terminate services
                        without serving of 4 weeks’ notice.
                        {'\n'}{'\n'}Any cancellation or termination made by Prime Tuition of the contract will be made in writing.
                        {'\n'}{'\n'}
                        Parents/guardians are required to serve a minimum of 4 Weeks’ notice if wish
                        to terminate the contract or to reduce any lessons, they should approach the admissions team
                        to serve who will forward them the necessary paperwork.{'\n'}{'\n'}
                        No lesson plan/day will change without a minimum of two weeks’
                        notice, twice in an Academic Year (From September to August). {'\n'}{'\n'}
                        Enrolment may also be cancelled where termination date has been specified in the admissions form.{'\n'}{'\n'}
                        Prime Tuition reserve the right to alter courses or programs, tutors or speakers, dates, or locations
                        and/or to cancel or change lessons at its discretion.
                    </Text>
                    <View style={[{ paddingHorizontal: 20 }, GlobalStyles.headerStyles]}>
                        <Text style={GlobalStyles.headerTextStyle}>Liability and Waiver</Text>
                    </View>
                    <Text style={styles.content}>
                        The academy is not responsible for any personal injury, loss, or damage to personal property that may occur on academy premises.{'\n'}{'\n'}
                        Students and their parents/guardians waive any claims against the academy in this regard.{'\n'}{'\n'}
                        Students/parents will be held responsible for any loss, theft, or damage to Prime Tuition property however caused by them and will fully indemnify Prime Tuition against resulting liabilities and expenses. Prime Tuition does not provide any guarantee or accept any responsibility or liability for the following:Students outside Prime Tuition premises.{'\n'}{'\n'}
                        The safekeeping of exam results or certificates,{'\n'}{'\n'}
                        Exam/coursework/controlled assessment or other results,{'\n'}{'\n'}
                        Availability of the service Prime Tuition provides or space within a course or class,{'\n'}{'\n'}
                        Any losses, damages for death or personal injuries or consequential loss except those resulting from Prime Tuition negligence or breach of duty.{'\n'}{'\n'}
                        Prime Tuition reserves the right to recover any overdue fees, charges, or other money, as part of its debt recovery process. In these circumstances, your liability to pay may be increased by additional fees and charges such as the cost of taking the matter to court or instructing debt collectors.{'\n'}{'\n'}
                        In all cases, the decision of the Headteacher will be final and binding.
                    </Text>
                    <View style={[{ paddingHorizontal: 20 }, GlobalStyles.headerStyles]}>
                        <Text style={GlobalStyles.headerTextStyle}>Miscellaneous</Text>
                    </View>
                    <Text style={styles.content}>
                        Prime Tuition over time is likely to undergo several changes, whether internally such as class size,
                        staff, or premises changes or externally such as mergers or reorganisation. For these reasons the
                        benefit and burden of this agreement may be freely assigned to another party at the discretion of Prime
                        Tuition. It is not practicable to consult with parents and students over every change that may take
                        place. Whenever practicable Prime Tuition will use reasonable endeavours to ensure that parents will be
                        informed.{'\n'}{'\n'}
                        If any words above or in combination infringe the Unfair Terms in Consumer Contracts Regulations 1999 or
                        any other provision of law, they shall be treated as severable and shall be replaced with words which
                        give as near the original meaning as may be fair.{'\n'}{'\n'}
                        Our CCTV system covers all building premises that included all constituted covered area of Prime
                        Tuition. The CCTV system produces video footage contains images & audio of all covered area. The
                        Management reserves the right to use these recordings to check the identity and authorisation status of
                        person(s) entering to and/or exiting from the Premises for the health, Security and safety of the staff,
                        students, visitors, and other ancillary person(s) connected with Prime Tuition. Recordings are kept for
                        a period of 15 to 30 days and may be consulted as deemed necessary.
                    </Text>
                    <View style={[{ paddingHorizontal: 20 }, GlobalStyles.headerStyles]}>
                        <Text style={GlobalStyles.headerTextStyle}>Proof of ID & Address</Text>
                    </View>
                    <Text style={styles.content}>
                        As a health & safety and well-being of children, we take pictures of all
                        students and store in our secure database. Parents/Guardians are also required to submit their proof of
                        ID document and proof of address.{'\n'}
                        (1- Passport/Driving License, 2- Council Letter/Utility bill)
                    </Text>
                    <View style={[{ paddingHorizontal: 20 }, GlobalStyles.headerStyles]}>
                        <Text style={GlobalStyles.headerTextStyle}>Force Mojeure</Text>
                    </View>
                    <Text style={styles.content}>
                        Prime Tuition shall not be liable for any breaches of its obligations under this Agreement resulting
                        from causes beyond its reasonable control including but not limited to Acts of God, enemy, fire, flood,
                        explosion, or other catastrophes.
                    </Text>
                    <View style={[{ paddingHorizontal: 20 }, GlobalStyles.headerStyles]}>
                        <Text style={GlobalStyles.headerTextStyle}>Disclaimer</Text>
                    </View>
                    <Text style={styles.content}>
                        Our prospectus, adverts, social media, and website are not contractual documents. While Prime Tuition
                        endeavours to ensure that the information on these mediums is correct, we do not warrant the accuracy
                        and completeness of the material on them. We may make changes to the material on the site or to the
                        services, products and prices described in it at any time without notice.
                        {'\n'}
                        {'\n'}
                        The material on the site/adverts is provided “as is”, without any conditions, warranties, or other terms
                        of any kind. Accordingly, to the maximum extent permitted by law, Prime Tuition site is provided on the
                        basis that we exclude all representations, warranties, conditions, and other terms (including, without
                        limitation, the conditions implied by law of satisfactory quality, fitness for purpose and the use of
                        reasonable care and skill) which apart from this legal notice might have effect in relation to the Prime
                        Tuition site.
                    </Text>
                    <View style={[{ paddingHorizontal: 20 }, GlobalStyles.headerStyles]}>
                        <Text style={GlobalStyles.headerTextStyle}>Amendments to Terms & Conditions</Text>
                    </View>
                    <Text style={styles.content}>
                        The organisation may update these terms and conditions with notice.
                        {'\n'}{'\n'}
                        Continued enrollment after the changes will indicate acceptance of the new terms.

                    </Text>
                    <View style={[{ paddingHorizontal: 20 }, GlobalStyles.headerStyles]}>
                        <Text style={GlobalStyles.headerTextStyle}>Governing Law and Jurisdiction</Text>
                    </View>
                    <Text style={styles.content}>
                        These terms and conditions are governed exclusively by the English laws of United Kingdom.
                    </Text>
                    <Text style={[styles.content, { fontFamily: FontFamily.bold }]}>
                        All notices must need to be served in advance only.
                    </Text>
                    <Text style={[styles.content, { fontFamily: FontFamily.semiBold }]}>
                        Note: We may modify any of the terms and conditions within in the Agreement
                        at any time
                        and at our sole discretion, such change to be given at least 4 weeks’ notice. If any of the
                        modifications are unacceptable to you, please write to the management. After 7 days of
                        this notice, it will be considered as your acceptance of the changes.
                    </Text>
                </View>
            </ScrollView >
        </SafeAreaView >
    )
}

export default TermsAndConditions

const styles = StyleSheet.create({
    content: {
        padding: 20,
        fontFamily: FontFamily.medium,
        fontSize: FontSizes.md,
        color: Color.text
    },

})