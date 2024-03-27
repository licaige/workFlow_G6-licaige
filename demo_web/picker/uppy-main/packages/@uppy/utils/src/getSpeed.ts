import type { FileProgress, FileProgressStarted } from './FileProgress'

export default function getSpeed(fileProgress: FileProgress): number {
  if (!fileProgress.bytesUploaded) return 0

  const timeElapsed =
    Date.now() - (fileProgress as FileProgressStarted).uploadStarted
  const uploadSpeed = fileProgress.bytesUploaded / (timeElapsed / 1000)
  return uploadSpeed
}
