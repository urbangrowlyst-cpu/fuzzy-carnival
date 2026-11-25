// Paste this into Google Sheets > Extensions > Apps Script, then Deploy > New deployment > Web app.
// Set "Execute as: Me" and "Who has access: Anyone". Copy the Web app URL into GOOGLE_SHEET_WEBHOOK_URL.

function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet()
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(["Date", "Name", "Business Name", "Phone", "Business Type", "Branches", "Preferred Time"])
  }
  var data = JSON.parse(e.postData.contents)
  sheet.appendRow([
    new Date(),
    data.name || "",
    data.businessName || "",
    data.phone || "",
    data.businessType || "",
    data.branches || "",
    data.preferredTime || "",
  ])
  return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(ContentService.MimeType.JSON)
}
