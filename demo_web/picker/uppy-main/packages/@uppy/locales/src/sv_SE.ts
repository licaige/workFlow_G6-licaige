import type { Locale } from '@uppy/utils/lib/Translator'

const sv_SE: Locale<0 | 1> = {
  strings: {},
  pluralize(n) {
    if (n === 1) {
      return 0
    }
    return 1
  },
}

sv_SE.strings = {
  addMore: 'Lägg till',
  addMoreFiles: 'Lägg till filer',
  addingMoreFiles: 'Lägger till fler filer',
  allowAccessDescription:
    'För att kunna ta bilder eller spela in video behöver du ge sidan behörighet att använda din kamera.',
  allowAccessTitle: 'Tillåt användning av kameran',
  authenticateWith: 'Anslut till %{pluginName}',
  authenticateWithTitle: 'Anslut till %{pluginName} för att välja filer',
  back: 'Tillbaka',
  browse: 'bläddra',
  browseFiles: 'bläddra',
  cancel: 'Avbryt',
  cancelUpload: 'Avbryt uppladdning',
  chooseFiles: 'Välj filer',
  closeModal: 'Stäng fönster',
  companionError: 'Anslutning till Companion misslyckades',
  complete: 'Klart',
  connectedToInternet: 'Ansluten till internet',
  copyLink: 'Kopiera länk',
  copyLinkToClipboardFallback: 'Kopiera länken nedanför',
  copyLinkToClipboardSuccess: 'Länken kopierad till urklipp',
  creatingAssembly: 'Förbereder uppladdning...',
  creatingAssemblyFailed: 'Transloadit: Kunde inte skapa Assembly',
  dashboardTitle: 'Filuppladdare',
  dashboardWindowTitle:
    'Uppladdningsfönster (Tryck på Esc-tangenten för att stänga)',
  dataUploadedOfTotal: '%{complete} av %{total}',
  done: 'Klart',
  dropHereOr: 'Släpp filer här eller %{browse}',
  dropHint: 'Släpp dina filer här',
  dropPasteBoth: 'Släpp filer här, klistra in eller %{browse}',
  dropPasteFiles: 'Släpp filer här, klistra in eller %{browse}',
  dropPasteFolders: 'Släpp filer här, klistra in eller %{browse}',
  dropPasteImportBoth:
    'Släpp filer här, klistra in, %{browse} eller importera från',
  dropPasteImportFiles:
    'Släpp filer här, klistra in, %{browse} eller importera från',
  dropPasteImportFolders:
    'Släpp filer här, klistra in, %{browse} eller importera från',
  editFile: 'Redigera fil',
  editImage: 'Redigera bild',
  editing: 'Redigerar %{file}',
  emptyFolderAdded: 'Inga filer lades till från en tom mapp',
  encoding: 'Kodar...',
  enterCorrectUrl:
    'Ogiltig URL: Kontrollera att adressen du anger är en direktlänk till en fil.',
  enterUrlToImport: 'Ange URL för att importera en fil',
  exceedsSize:
    'Storleken på filen överstiger den tillåtna maxgränsen på %{size}',
  failedToFetch:
    'Companion kunde inte ladda ner filen, kontrollera att adressen är korrekt',
  failedToUpload: 'Kunde inte ladda upp %{file}',
  fileSource: 'Källa: %{name}',
  filesUploadedOfTotal: {
    '0': '%{complete} av %{smart_count} fil uppladdad',
    '1': '%{complete} av %{smart_count} filer uppladdade',
  },
  filter: 'Filtrera',
  finishEditingFile: 'Avsluta redigering av filen',
  folderAdded: {
    '0': 'La till %{smart_count} fil från %{folder}',
    '1': 'La till %{smart_count} filer från %{folder}',
  },
  import: 'Importera',
  importFrom: 'Importera från %{name}',
  loading: 'Laddar...',
  logOut: 'Logga ut',
  myDevice: 'Min enhet',
  noFilesFound: 'Du har inga filer eller mappar här',
  noInternetConnection: 'Ingen internetuppkoppling',
  openFolderNamed: 'Öppna mappen %{name}',
  pause: 'Pausa',
  pauseUpload: 'Pausa uppladdning',
  paused: 'Pausad',
  poweredBy: 'Drivs av %{uppy}',
  processingXFiles: {
    '0': 'Processerar %{smart_count} fil',
    '1': 'Processerar %{smart_count} filer',
  },
  removeFile: 'Ta bort fil',
  resetFilter: 'Nollställ filter',
  resume: 'Återuppta',
  resumeUpload: 'Återuppta uppladdning',
  retry: 'Försök igen',
  retryUpload: 'Försök igen',
  saveChanges: 'Spara ändringar',
  selectFileNamed: 'Välj fil %{name}',
  selectX: {
    '0': 'Välj %{smart_count}',
    '1': 'Välj %{smart_count}',
  },
  smile: 'Säg omelett!', // translates to "Say cheese!" - which works well in this context in Swedish
  startRecording: 'Starta inspelning',
  stopRecording: 'Avbryt inspelning',
  takePicture: 'Ta bild',
  timedOut: 'Uppladdningen har stått stilla i %{seconds} sekunder; avbryter.',
  unselectFileNamed: 'Avmarkera filen %{name}',
  upload: 'Ladda upp',
  uploadComplete: 'Uppladdning slutförd',
  uploadFailed: 'Uppladdning misslyckad',
  uploadPaused: 'Uppladdning pausad',
  uploadXFiles: {
    '0': 'Ladda upp %{smart_count} fil',
    '1': 'Ladda upp %{smart_count} filer',
  },
  uploadXNewFiles: {
    '0': 'Ladda upp %{smart_count} fil',
    '1': 'Ladda upp %{smart_count} filer',
  },
  uploading: 'Laddar upp',
  uploadingXFiles: {
    '0': 'Ladda upp %{smart_count} fil',
    '1': 'Ladda upp %{smart_count} filer',
  },
  xFilesSelected: {
    '0': '%{smart_count} fil vald',
    '1': '%{smart_count} filer valda',
  },
  xMoreFilesAdded: {
    '0': '%{smart_count} fil tillagd',
    '1': '%{smart_count} filer tillagda',
  },
  xTimeLeft: '%{time} återstår',
  youCanOnlyUploadFileTypes: 'Du kan endast ladda upp: %{types}',
  youCanOnlyUploadX: {
    '0': 'Du kan endast ladda upp %{smart_count} fil',
    '1': 'Du kan endast ladda upp %{smart_count} filer',
  },
  youHaveToAtLeastSelectX: {
    '0': 'Du måste välja minst %{smart_count} fil',
    '1': 'Du måste välja minst %{smart_count} filer',
  },
}

// TODO: remove this in the next major?
// @ts-expect-error Uppy can be a global in legacy bundle
if (typeof Uppy !== 'undefined') {
  // @ts-expect-error Uppy can be a global in legacy bundle
  globalThis.Uppy.locales.sv_SE = sv_SE
}

export default sv_SE
