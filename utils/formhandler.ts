import { Locator, Page } from "@playwright/test";

// Utility class for form handling
class Forms {
    async fillField(loc: Locator, fieldName: string, value: any) {
        // Fill a specific input field with the provided value
        let element = loc.locator(`input[name="${fieldName}"]`);
        await element.fill(value);
    }

    async submit(loc: Locator) {
        // Submit the form by double-clicking the button
        await loc.locator('input[class="button"]').dblclick();
    }
}

export const forms = new Forms(); // Export an instance of the Forms class