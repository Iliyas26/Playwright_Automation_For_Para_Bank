import { Locator, Page } from "@playwright/test";

class Forms {
    async fillField(loc: Locator, fieldName: string, value: any) {
        let element = loc.locator(`input[name="${fieldName}"]`);

        await element.fill(value);
    }

    async submit(loc: Locator){
        await loc.locator('input[class="button"]').dblclick();
    }
}

export const forms = new Forms();