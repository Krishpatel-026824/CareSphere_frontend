function fileName(title) {
  return `${title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}.txt`
}

function recordText(record) {
  return [
    record.title,
    `Doctor: ${record.doctorName || ''}`,
    `Type: ${record.type}`,
    `Date: ${record.date}`,
    record.size ? `Size: ${record.size}` : '',
    '',
    record.summary || 'No summary available.',
    '',
    'CareSphere health record',
  ]
    .filter((line) => line !== '')
    .join('\n')
}

function saveTextFile(name, text) {
  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = name
  document.body.appendChild(link)
  link.click()
  link.remove()
  URL.revokeObjectURL(url)
}

export function downloadRecordFile(record) {
  saveTextFile(fileName(record.title), recordText(record))
}

export function downloadRecordFiles(records, doctorName) {
  if (!records?.length) return

  if (records.length === 1) {
    downloadRecordFile(records[0])
    return
  }

  const text = records.map((record) => recordText(record)).join('\n\n-----\n\n')
  const name = fileName(`${doctorName || 'caresphere'}-records`)
  saveTextFile(name, text)
}
