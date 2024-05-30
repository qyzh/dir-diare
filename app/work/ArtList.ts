interface ArtList {
    title: string,
    tagz: string,
    description: string,
    href?: string,
    imgSrc?: string,
  }
  
  const projectsData: ArtList[] = [
    {
      title: 'A Search Engine',
      tagz: 'Template Blogger',
      description: `What if you could look up any information in the world? Webpages, images, videos
      and more. Google has many features to help you find exactly what you're looking
      for.`,
      imgSrc: 'https://images.unsplash.com/photo-1572010696997-c73e95aeebe8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA==&auto',
      href: 'https://www.google.com',
    },
    {
      title: 'The Time Machine',
      tagz: 'Template Blogger',
      description: `Imagine being able to travel back in time or to the future. Simple turn the knob
      to the desired date and press "Go". No more worrying about lost keys or
      forgotten headphones with this simple yet affordable solution.`,
      imgSrc: 'https://images.unsplash.com/photo-1572010696997-c73e95aeebe8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA==&auto',
      href: '/blog/the-time-machine',
    },
    
    {
        title: 'The Time Machine',
        tagz: 'Template Blogger',
        description: `Imagine being able to travel back in time or to the future. Simple turn the knob
        to the desired date and press "Go". No more worrying about lost keys or
        forgotten headphones with this simple yet affordable solution.`,
        imgSrc: 'https://images.unsplash.com/photo-1572010696997-c73e95aeebe8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA==&auto',
        href: '/blog/the-time-machine',
      },
  ]
  
  export default projectsData
  