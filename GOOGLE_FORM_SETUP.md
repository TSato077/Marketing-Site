# Google Form Setup Instructions

Create a Google Form with the following exact questionnaire fields to match the original booking form.

## Form Fields (in order):

### 1. First Name
- **Type:** Short answer
- **Required:** Yes
- **Validation:** None

### 2. Last Name
- **Type:** Short answer
- **Required:** Yes
- **Validation:** None

### 3. Email
- **Type:** Short answer
- **Required:** Yes
- **Validation:** Email format

### 4. Phone
- **Type:** Short answer
- **Required:** No
- **Validation:** None

### 5. Number of Family Members
- **Type:** Short answer
- **Required:** No
- **Validation:** Number

### 6. Preferred Date/Time Slots
- **Type:** Checkboxes
- **Required:** Yes
- **Description:** "Select up to 3 preferred slots"
- **Options:**
  - Nov 22 — 3:00–3:25 PM
  - Nov 22 — 3:30–3:55 PM
  - Nov 22 — 4:00–4:25 PM
  - Nov 22 — 4:30–4:55 PM
  - Nov 22 — 5:00–5:25 PM
  - Nov 23 — 3:00–3:25 PM
  - Nov 23 — 3:30–3:55 PM
  - Nov 23 — 4:00–4:25 PM
  - Nov 23 — 4:30–4:55 PM
  - Nov 23 — 5:00–5:25 PM

### 7. Questions / Notes
- **Type:** Paragraph
- **Required:** No
- **Placeholder:** "Tell us about your family or any special requests."

## Final Text/Paragraph

Add a text element or paragraph at the end of the form with:

> "I understand payment is required to reserve a spot. Please send the invoice link to confirm my booking."

## After Creating the Form

1. Click "Send" button in Google Forms
2. Click the embed icon (`</>`)
3. Copy the `src` URL from the iframe code
4. Update `googleFormUrl` in `src/components/ReserveEmail.astro` (line 7)

Example URL format:
```
https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform?embedded=true
```

