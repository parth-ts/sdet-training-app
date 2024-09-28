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

  // test radio button
  /**
   * 1. get notifyMeAboutSection
   * 2. get radio buttons
   * 3. check radio button (apply different conditions)
   * 4.
   */

  const notifyMeAboutSection = formLocator.locator("div").filter({
    has: page.getByText("Notify me about..."),
    // has: page.locator("label").getByText("Notify me about..."),
  });
  await expect(notifyMeAboutSection).toBeVisible();

  /*
  ex: 2
    const notifyMeAboutSection = radioField.locator("div").locator("label");
    await expect(notifyMeAboutSection).toHaveCount(3);
    */
  const radioBtnLabel = notifyMeAboutSection
    .locator("div")
    .filter({ hasNotText: "Notify me about..." })
    .filter({ has: page.getByLabel("All new messages") })
    .filter({ has: page.getByLabel("Direct messages and mentions") });
  await expect(radioBtnLabel).toBeVisible();

  const radioBtnOptions = radioBtnLabel
    .getByRole("radio")
    .and(page.locator("button"));
  await expect(radioBtnOptions).toHaveCount(3);

  /*
  ex: 2
  const radioBtnOptions = notifyMeAboutSection
    .getByRole("radio")
    .and(page.locator("button"));
  await expect(radioBtnOptions).toHaveCount(3);
   */

  const firstRadioBtn = radioBtnOptions.first();
  await expect(firstRadioBtn).toBeVisible();
  await firstRadioBtn.click();
  await expect(firstBtnOption).toBeChecked();

  const secondRadioBtn = radioBtnOptions.nth(1);
  await expect(secondRadioBtn).toBeVisible();
  await expect(secondRadioBtn).not.toBeChecked();

  const thirdRadioBtn = radioBtnOptions.last();
  await expect(thirdRadioBtn).toBeVisible();
  await expect(thirdRadioBtn).not.toBeChecked();
  await thirdRadioBtn.click();
  await expect(thirdRadioBtn).toBeChecked();
  await expect(firstRadioBtn).not.toBeChecked();
  await expect(secondRadioBtn).not.toBeChecked();

  /* test dropdown button */

  /*
  const countrySection = formLocator
    .locator("div")
    .filter({ hasText: "Country" });
  await expect(countrySection).toBeVisible();

  const labelText = countrySection.getByText(
    "This is the country you are currently living in."
  );
  await expect(labelText).toBeVisible();

  const selectBtn = countrySection.locator("button");
  await expect(selectBtn).toBeVisible();

  const selectText = selectBtn.locator("span");
  // const selectText = selectBtn.getByText("Select a verified email to display");

  await expect(selectText).toBeVisible();
  await expect(selectText).toHaveText("Select a verified email to display");

  await selectBtn.click();

  const selectOptions = countrySection.locator("select");
  await expect(selectOptions).toBeVisible();
  await selectOptions.selectOption("India");

  const option = await selectOptions.inputValue();
  // console.log(option);

  await expect(selectOptions).toHaveValue(option);
  await expect(selectText).toHaveText("India");

  */

  /* test bio text area*/

  const bioSection = formLocator
    .locator("div")
    .filter({ hasText: "Bio" })
    .filter({ hasNotText: "Country" });
  await expect(bioSection).toBeVisible();

  const textArea = bioSection.getByLabel("Bio");
  await expect(textArea).toBeVisible();

  const bioDescription = bioSection.getByText(
    "You can @mention other users and organizations."
  );
  await expect(bioDescription).toBeVisible();

  textArea.pressSequentially("Hii, there");
});
