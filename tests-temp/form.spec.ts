import { expect, test } from "@playwright/test";

test("create profile form", async ({ page }) => {
  await page.goto("http://localhost:3000/form");

  const formLocator = page.locator("form");

  const usernameContainer = formLocator.locator("div").filter({
    has: page.getByLabel("username"),
  });

  await expect(usernameContainer).toBeVisible();

  const usernameContainerMinCharErrorLocator = usernameContainer.getByText(
    "String must contain at least 2 character(s)"
  );

  await expect(usernameContainerMinCharErrorLocator).not.toBeVisible();

  const descriptionLocator = usernameContainer.getByText(
    "This is your public display name."
  );

  await expect(descriptionLocator).toBeVisible();

  const interestsContainer = formLocator
    .locator("div")
    .filter({
      has: page.getByRole("checkbox"),
    })
    .filter({
      has: page.getByText("Interests"),
    });

  await expect(interestsContainer).toBeVisible();

  // 1. 3 options are presented
  // 2. 3 options are what we want them to be
  // 3. Option must be selectable
  // 4. Multiple options can be selectable at the same time
  // 5. Option must be unselectable
  // 6. Clicking on the label should toggle the checkbox
  // 7. Clicking on the button should toggle the checkbox

  const LabelOptions = interestsContainer.locator("label").filter({
    hasNotText: "Interests",
  });

  await expect(LabelOptions).toHaveCount(3);

  const interestItems = ["Books", "Movies", "Music"];

  for (const interest of await LabelOptions.all()) {
    const interestText = await interest.textContent();

    expect(interestItems).toContain(interestText);
  }

  // const buttonOptions = interestsContainer.locator("button").filter({
  //   has: page.getByRole("checkbox"),
  // });

  const buttonOptions = interestsContainer
    .getByRole("checkbox")
    .and(page.locator("button"));

  await expect(buttonOptions).toHaveCount(3);

  const firstLabel = LabelOptions.first();

  await expect(firstLabel).toBeChecked();

  await firstLabel.uncheck();

  await expect(firstLabel).not.toBeChecked();

  await firstLabel.check();

  await expect(firstLabel).toBeChecked();

  const secondLabel = LabelOptions.nth(1);

  await expect(secondLabel).not.toBeChecked();

  await secondLabel.check();

  await expect(secondLabel).toBeChecked();
  await expect(firstLabel).toBeChecked();

  const lastLabel = LabelOptions.last();

  await expect(lastLabel).not.toBeChecked();

  const firstBtnOption = buttonOptions.first();

  await expect(firstBtnOption).toBeChecked();

  await firstBtnOption.click();

  await expect(firstBtnOption).not.toBeChecked();

  await firstBtnOption.click();

  await expect(firstBtnOption).toBeChecked();

  await secondLabel.uncheck();

  await expect(secondLabel).not.toBeChecked();

  for (const item of await buttonOptions.all()) {
    const isChecked = await item.isChecked();

    if (!isChecked) {
      await item.check();
    }

    await expect(item).toBeChecked();
  }

  const submitBtn = formLocator.getByRole("button", {
    name: "Submit",
  });

  await submitBtn.click();

  await expect(usernameContainerMinCharErrorLocator).toBeVisible();

  const usernameLabel = usernameContainer.getByLabel("Username");

  await expect(usernameLabel).toBeVisible();

  await usernameLabel.pressSequentially("One Piece");

  await expect(usernameLabel).toHaveValue("One Piece");

  await expect(usernameContainerMinCharErrorLocator).not.toBeVisible();

  const countryContainer = formLocator.locator("div").filter({
    has: page.getByLabel("country"),
  });

  await expect(countryContainer).toBeVisible();

  const dropdownTriggerBtn = countryContainer
    .getByRole("combobox")
    .and(page.locator("button"));

  await expect(dropdownTriggerBtn).toBeVisible();

  const dropdownBtnText = await dropdownTriggerBtn.textContent();

  expect(dropdownBtnText).toBe("Select a verified email to display");

  await dropdownTriggerBtn.click();

  const dropdownList = page.locator("[data-radix-select-viewport]");

  await expect(dropdownList).toBeVisible();

  const dropdownOptions = dropdownList.getByRole("option");

  await expect(dropdownOptions).toHaveCount(3);

  const firstOption = dropdownOptions.first();

  await expect(firstOption).toBeVisible();

  await firstOption.click();

  // await dropdownList.selectOption({
  //   label: "India",
  // });

  // await page.click("body");

  await expect(dropdownTriggerBtn).toHaveText("India");

  const bioContainer = formLocator.locator("div").filter({
    has: page.getByLabel("bio"),
  });

  await expect(bioContainer).toBeVisible();

  const bioTextarea = bioContainer.getByLabel("Bio");

  await expect(bioTextarea).toBeVisible();

  // await bioTextarea.click();

  await bioTextarea.fill("I am a software engineer");

  await expect(bioTextarea).toHaveValue("I am a software engineer");
});
