// Importing the Stripe Publish Key from environment variables
import { stripePublishKey } from '@env'


export const constant = {
    // Stripe Publish Key: This key is used for client-side authentication with the Stripe API.
    // It is fetched from the environment variables defined in the .env file.
    stripePublishKey: stripePublishKey
}