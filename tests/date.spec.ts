import { expect, test } from "@playwright/test";

test("date", async ({ page }) => {
  await page.goto("http://localhost:3000/date");

  const formLocator = page.locator("form");
  await expect(formLocator).toBeVisible();

  const dateField = formLocator
    .locator("div")
    .filter({ has: page.getByLabel("Date of birth") });

  await expect(dateField).toBeVisible();

  const dateInput = dateField.getByLabel("Date of birth");
  await expect(dateInput).toBeVisible();
  await dateInput.click();

  const dateDialog = page.locator("div").getByRole("dialog");
  await expect(dateDialog).toBeVisible();

  const dateTable = dateDialog.locator("table");
  await expect(dateTable).toBeVisible();

  const dateTableHead = dateTable.locator("thead");
  await expect(dateTableHead).toBeVisible();

  const weeks = dateTableHead.locator("tr th");
  await expect(weeks).toHaveCount(7);

  const dateTableBody = dateTable.locator("tbody");
  await expect(dateTableBody).toBeVisible();

  const dates = dateTableBody.getByRole("presentation");
  await expect(dates).toHaveCount(35);

  const date12 = dateTableBody
    .locator("tr td")
    .getByRole("gridcell", { name: "12" });
  await expect(date12).toBeVisible();

  await date12.click();

  const dateButtonText = formLocator.getByRole("button", {
    name: "September 11th, 2024",
  });
  await expect(dateButtonText).toBeVisible();

  //   const datePresentation = dateDialog.getByRole("presentation");
  //   await expect(datePresentation).toBeVisible();

  //   const datePresentation = dateDialog
  //     .locator("div")
  //     .filter({ has: page.getByRole("presentation") })
  //     .filter({
  //       has: page.getByRole("button", {
  //         name: `[aria-label="Go to previous month"]`,
  //       }),
  //     });
  //   await expect(datePresentation).toBeVisible();
});
