import type { Locale } from '@uppy/utils/lib/Translator'

const fr_FR: Locale<0 | 1> = {
  strings: {},
  pluralize(n) {
    if (n <= 1) {
      return 0
    }
    return 1
  },
}

fr_FR.strings = {
  addBulkFilesFailed: {
    '0': 'L’ajout de %{smart_count} fichier a échoué',
    '1': 'L’ajout de %{smart_count} fichiers a échoué',
  },
  addedNumFiles: '%{numFiles} fichier(s) ajouté(s)',
  addingMoreFiles: 'Ajout de fichiers',
  addMore: 'Ajouter d’autres',
  addMoreFiles: 'Ajouter d’autres fichiers',
  allFilesFromFolderNamed: 'Tous les fichiers du dossier %{name}',
  allowAccessDescription:
    'Pour prendre des photos ou enregistrer une vidéo, veuillez autoriser l’accès à votre caméra pour ce site.',
  allowAccessTitle: 'Veuillez autoriser l’accès à votre caméra',
  authAborted: 'Authentification interrompue',
  authenticateWith: 'Se connecter à %{pluginName}',
  authenticateWithTitle:
    'Veuillez vous authentifier avec %{pluginName} pour sélectionner les fichiers',
  back: 'Retour',
  browse: 'naviguer',
  browseFiles: 'naviguer',
  cancel: 'Annuler',
  cancelUpload: 'Annuler le téléversement',
  chooseFiles: 'Choisir des fichiers',
  closeModal: 'Fermer la fenêtre',
  companionError: 'Connexion à Companion a échoué',
  companionUnauthorizeHint:
    'Pour vous déconnecter de votre compte %{provider}, veuillez aller à %{url}',
  complete: 'Terminé',
  compressedX: '%{size} économisé(s) par la compression',
  compressingImages: 'Compression des images…',
  connectedToInternet: 'Connecté à Internet',
  copyLink: 'Copier le lien',
  copyLinkToClipboardFallback: 'Copier le lien ci-dessous',
  copyLinkToClipboardSuccess: 'Lien copié',
  creatingAssembly: 'Préparation du téléversement…',
  creatingAssemblyFailed: 'Transloadit: Impossible de créer Assembly',
  dashboardTitle: 'Téléverseur de fichiers',
  dashboardWindowTitle:
    'Fenêtre de téléversement de fichiers (Appuyez sur Échap pour fermer)',
  dataUploadedOfTotal: '%{complete} sur %{total}',
  done: 'Terminé',
  dropHereOr: 'Déposer les fichiers ici ou %{browse}',
  dropHint: 'Déposez vos fichiers ici',
  dropPasteBoth: 'Déposer les fichiers ici, coller ou %{browse}',
  dropPasteFiles: 'Déposer les fichiers ici, coller ou %{browse}',
  dropPasteFolders: 'Déposer les fichiers ici, coller ou %{browse}',
  dropPasteImportBoth:
    'Déposer les fichiers ici, coller, %{browse} ou importer de',
  dropPasteImportFiles:
    'Déposer les fichiers ici, coller, %{browse} ou importer de',
  dropPasteImportFolders:
    'Déposer les fichiers ici, coller, %{browse} ou importer de',
  editFile: 'Modifier le fichier',
  editImage: 'Modifier l’image',
  editFileWithFilename: 'Modifier le fichier %{file}',
  editing: 'Modification en cours de %{file}',
  emptyFolderAdded: 'Aucun fichier n’a été ajouté depuis un dossier vide',
  encoding: 'Traitement…',
  enterCorrectUrl:
    'Lien incorrect: Assurez-vous que vous entrez un lien direct vers le fichier',
  enterUrlToImport: 'Entrez le lien pour importer un fichier',
  exceedsSize: 'Ce fichier dépasse la taille maximale autorisée de %{size}',
  failedToFetch:
    'Companion a échoué à récupérer ce lien, assurez-vous qu’il est correct',
  failedToUpload: 'Le téléversement de %{file} a échoué',
  fileSource: 'Fichier source: %{name}',
  filesUploadedOfTotal: {
    '0': '%{complete} sur %{smart_count} fichier téléversé',
    '1': '%{complete} sur %{smart_count} fichiers téléversés',
  },
  filter: 'Filtrer',
  finishEditingFile: 'Terminer l’édition du fichier',
  folderAdded: {
    '0': '%{smart_count} fichier ajouté de %{folder}',
    '1': '%{smart_count} fichiers ajoutés de %{folder}',
  },
  generatingThumbnails: 'Génération des vignettes…',
  import: 'Importer',
  importFrom: 'Importer de %{name}',
  loading: 'Chargement…',
  logOut: 'Déconnexion',
  micDisabled: 'Accès au micro refusé par l’utilisateur',
  myDevice: 'Mon Appareil',
  noDuplicates: 'Impossible d’ajouter le fichier "%{fileName}", il existe déjà',
  noFilesFound: 'Vous n’avez aucun fichier ou dossier ici',
  noInternetConnection: 'Pas de connexion à Internet',
  noMoreFilesAllowed:
    'Impossible d’ajouter de nouveaux fichiers: en cours de chargement ',
  openFolderNamed: 'Ouvrir %{name}',
  pause: 'Pause',
  pauseUpload: 'Mettre en pause le téléversement',
  paused: 'En pause',
  poweredBy: 'Propulsé par %{uppy}',
  processingXFiles: {
    '0': 'Traitement de %{smart_count} fichier',
    '1': 'Traitement de %{smart_count} fichiers',
  },
  recording: 'Enregistrement',
  recordingLength: 'Durée d’enregistrement %{recording_length}',
  recordingStoppedMaxSize:
    'L’enregistrement s’est arrété car la taille du fichier dépasse la limite',
  removeFile: 'Effacer le fichier %{file}',
  resetFilter: 'Réinitialiser filtre',
  resume: 'Reprendre',
  resumeUpload: 'Reprendre le téléversement',
  retry: 'Réessayer',
  retryUpload: 'Réessayer le téléversement',
  save: 'Sauvegarder',
  saveChanges: 'Sauvegarder les modifications',
  selectFileNamed: 'Sélectionner le fichier %{name}',
  selectX: {
    '0': 'Sélectionner %{smart_count}',
    '1': 'Sélectionner %{smart_count}',
  },
  smile: 'Souriez !',
  startRecording: 'Commencer l’enregistrement vidéo',
  stopRecording: 'Arrêter l’enregistrement vidéo',
  streamActive: 'Stream actif',
  streamPassive: 'Stream passif',
  submitRecordedFile: 'Envoyer la vidéo enregistrée',
  takePicture: 'Prendre une photo',
  timedOut: 'Téléversement bloqué durant %{seconds} secondes, annulation.',
  unselectFileNamed: 'Désélectionner le fichier %{name}',
  upload: 'Téléverser',
  uploadComplete: 'Téléversement terminé',
  uploadFailed: 'Le téléversement a échoué',
  uploadPaused: 'Téléversement mis en pause',
  uploadStalled:
    'Téléversement bloqué depuis %{seconds} secondes. Il est peut-être nécessaire de recommencer l’opération.',
  uploadXFiles: {
    '0': 'Téléverser %{smart_count} fichier',
    '1': 'Téléverser %{smart_count} fichiers',
  },
  uploadXNewFiles: {
    '0': 'Téléverser +%{smart_count} fichier',
    '1': 'Téléverser +%{smart_count} fichiers',
  },
  uploading: 'Téléversement en cours',
  uploadingXFiles: {
    '0': 'Téléversement de %{smart_count} fichier',
    '1': 'Téléversement de %{smart_count} fichiers',
  },
  xFilesSelected: {
    '0': '%{smart_count} fichier sélectionné',
    '1': '%{smart_count} fichiers sélectionnés',
  },
  xMoreFilesAdded: {
    '0': '%{smart_count} autre fichier ajouté',
    '1': '%{smart_count} autres fichiers ajoutés',
  },
  xTimeLeft: '%{time} restantes',
  youCanOnlyUploadFileTypes: 'Vous pouvez seulement téléverser: %{types}',
  youCanOnlyUploadX: {
    '0': 'Vous pouvez seulement téléverser %{smart_count} fichier',
    '1': 'Vous pouvez seulement téléverser %{smart_count} fichiers',
  },
  youHaveToAtLeastSelectX: {
    '0': 'Vous devez sélectionner au moins %{smart_count} fichier',
    '1': 'Vous devez sélectionner au moins %{smart_count} fichiers',
  },
}

// TODO: remove this in the next major?
// @ts-expect-error Uppy can be a global in legacy bundle
if (typeof Uppy !== 'undefined') {
  // @ts-expect-error Uppy can be a global in legacy bundle
  globalThis.Uppy.locales.fr_FR = fr_FR
}

export default fr_FR
