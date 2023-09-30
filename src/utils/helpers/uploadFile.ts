import { ChangeEvent } from 'react'

export function uploadImage(event: ChangeEvent<HTMLInputElement>) {
  const reader = new FileReader()
  const element = event.target
  if (element.files) {
    const name = element.files[0].name
    reader.addEventListener('load', function (this: FileReader) {
      if (this.result && localStorage) {
        window.localStorage.setItem(name, this.result as string)
      } else {
        alert()
      }
    })
    reader.readAsDataURL(element.files[0])
  }
}
