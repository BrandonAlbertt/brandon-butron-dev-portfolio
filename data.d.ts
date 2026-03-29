declare module '@/data/projects.json' {
  const projects: Array<{
    id: number
    title: string
    description: string
    image: string
    technologies: string[]
    github: string
    demo: string
    video: string
  }>
  export default projects
}

declare module '@/data/certificates.json' {
  const certificates: Array<{
    id: number
    title: string
    organization: string
    year: number
    certificateLink: string
    certificateImage: string
  }>
  export default certificates
}
