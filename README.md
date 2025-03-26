# SP-17-PlugIn - An ethical alternative coupon extension

## **Description**
SP-17-PlugIn is a Chrome extension designed to help users find and apply the best available coupon codes while maintaining ethical standards. Unlike other coupon extensions, this tool ensures:

- Coupons are applied transparently without altering affiliate codes.
- The extension does not prioritize certain deals for financial gain.
- A user-friendly approach to coupon finding

The project is currently in its early stages, currently only with a basic structure of an extension.

## **Planned features**
- A side panel that opens on all websites (which is currently a placeholder GUI)
- Basic structure for coupon submission and retrieval tool
- Compliant scraping mechanisms and a transparent coupon application process from trusted sources
- User authentication (used for submitting and validating coupons)

## **Firebase setup**
- Create a Firebase project https://console.firebase.google.com/
- Set up Firestore in test mode
- Enable anonymous authentication under Authentication -> Sign-in method
- Update Firestore security rules to allow reads (temporarily for testing)
- Copy your Firebase config object from the Firebase console
- Create file 'firebase-config.js' in main/js
- Use firebase-config-example.js as a reference