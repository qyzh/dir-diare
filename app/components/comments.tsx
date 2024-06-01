"use client";


import Giscus from "@giscus/react";

export default function Comments() {

  return (
    <Giscus
      id="comments"
      repo="qyzh/dir-diare"
      repoId="R_kgDOL6kgew"
      category="General"
      categoryId="DIC_kwDOL6kge84CftWI"
      mapping="title"
      term="Welcome to @giscus/react component!"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="bottom"
      theme="preferred_color_scheme"
      lang="en"
      loading="lazy"
    />
  );
}