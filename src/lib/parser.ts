
export async function parseFile(file: File): Promise<{ text: string, dataUrl?: string, type: string }>{
  const ext = file.name.split('.').pop()?.toLowerCase() || ''
  if(['txt','md','markdown'].includes(ext)){
    return { text: await file.text(), type: 'txt' }
  }
  if(file.type.startsWith('image/')){
    return new Promise(res=>{
      const r = new FileReader()
      r.onload = ()=> res({ text: r.result as string, dataUrl: r.result as string, type: 'image' })
      r.readAsDataURL(file)
    })
  }
  if(file.type.startsWith('audio/')){
    return new Promise(res=>{
      const r = new FileReader()
      r.onload = ()=> res({ text: `[音訊 ${file.name}]`, dataUrl: r.result as string, type: 'audio' })
      r.readAsDataURL(file)
    })
  }
  const buf = await file.arrayBuffer()
  return { text: `[${ext.toUpperCase()} ${file.name} ${buf.byteLength} bytes] 已接收`, type: ext }
}
