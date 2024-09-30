import { expect, test } from "@playwright/test";
test("view", async ({ page }) => {
  await page.goto("http://localhost:3000/tasks");

  const tableLocator = page.getByRole("table");
  await expect(tableLocator).toBeVisible();

  const tableHeader = tableLocator.locator("thead");
  await expect(tableHeader).toBeVisible();

  const titleHeaderBtn = tableHeader.getByRole("button", { name: "Title" });
  await expect(titleHeaderBtn).toBeVisible();

  const statusHeaderBtn = tableHeader.getByRole("button", {
    name: "Status",
  });
  await expect(statusHeaderBtn).toBeVisible();

  const priorityHeaderBtn = tableHeader.getByRole("button", {
    name: "Priority",
  });
  await expect(priorityHeaderBtn).toBeVisible();

  const viewBtn = page.locator("div button").filter({ hasText: "View" });
  await expect(viewBtn).toBeVisible();
  await viewBtn.click();

  //   const viewContainer = page.locator("[data-radix-popper-content-wrapper]");
  const viewContainer = page.getByRole("menu");
  await expect(viewContainer).toBeVisible();

  const menuDialogOptionsLocator = viewContainer.getByRole("menuitemcheckbox");
  const menuDialogOptionsCount = await menuDialogOptionsLocator.count();
  expect(menuDialogOptionsCount).toBe(3);

  const viewItems = ["title", "status", "priority"];

  for (const viewOption of await menuDialogOptionsLocator.all()) {
    const viewOptionContent = await viewOption.textContent();
    expect(viewItems).toContain(viewOptionContent);
    await viewOption.click();
    await expect(tableHeader).not.toContainText(`${viewOptionContent}`);
    await viewBtn.click();
  }

  for (const viewOption of await menuDialogOptionsLocator.all()) {
    await expect(viewOption).not.toBeChecked();
  }

  /*
  const titleOption = menuDialogOptionsLocator.getByText("title");
  await expect(titleOption).toBeVisible();
  await titleOption.click();
  await expect(titleOption).not.toBeChecked();
  await expect(titleHeaderBtn).not.toBeVisible();
  */

  /*
  // ex: 2

  const toggleColumns = viewContainer.getByText("Toggle columns");
  await expect(toggleColumns).toBeVisible();

  const titleOption = menuDialogOptionsLocator.getByText("Title");
  await expect(titleOption).toBeVisible();
  await expect(titleOption).toBeChecked();

  const statusOption = menuDialogOptionsLocator.getByText("Status");
  await expect(statusOption).toBeVisible();
  await expect(statusOption).toBeChecked();

  const priorityOption = menuDialogOptionsLocator.getByText("Priority");
  await expect(priorityOption).toBeVisible();
  await expect(priorityOption).toBeChecked();

  await titleOption.click();
  await expect(titleOption).not.toBeChecked();

  await viewBtn.click();
  await expect(titleOption).not.toBeChecked();

  */
});

/* 
    filter > status > priority 
*/

/* test table */
test("table", async ({ page }) => {
  await page.goto("http://localhost:3000/tasks");

  const filterInputLocator = page.getByPlaceholder("Filter tasks...");
  await expect(filterInputLocator).toBeVisible();

  const tableLocator = page.getByRole("table");
  await expect(tableLocator).toBeVisible();

  const tableHeadLocator = tableLocator.locator("thead");
  await expect(tableHeadLocator).toBeVisible();

  const tableBodyLocator = tableLocator.locator("tbody");
  await expect(tableBodyLocator).toBeVisible();

  const tableRowLocator = tableBodyLocator
    .locator("tr")
    .filter({ has: page.getByRole("checkbox") });
  const tabelRowCount = await tableRowLocator.count();
  expect(tabelRowCount).toBe(10);

  //   const nextPageBtn = page.getByRole("button").filter({
  //     has: page.getByLabel("Go to next page"),
  //   });
  //   await expect(nextPageBtn).toBeVisible();

  /* date picker */
});

/* test control bar */
test("control bar", async ({ page }) => {
  await page.goto("http://localhost:3000/tasks");

  const controlBarLocator = page
    .locator("div")
    .filter({ has: page.getByPlaceholder("Filter Tasks...") })
    .filter({ has: page.getByRole("button", { name: "Status" }) })
    .filter({ hasNot: page.locator("tabel") })
    .filter({ hasNot: page.getByRole("button", { name: "View" }) });
  await expect(controlBarLocator).toBeVisible();
});

test("simple date picker", async ({ page }) => {
  await page.goto("http://localhost:3000/tasks");

  const dateLabelLocator = page.getByText("Date: ");
  await expect(dateLabelLocator).toBeVisible();

  //   const dateInputLocator = page.locator("#task");
  //   const dateInputLocator = page.locator(`[name="task"]`);
  const dateInputLocator = page.locator(`[id="task"]`);
  await expect(dateInputLocator).toBeVisible();

  let date = "2024-01-01";
  //   let date = "01-01-2024"; // not work
  await dateInputLocator.fill(date);
  await expect(dateInputLocator).toHaveValue(date);
});
