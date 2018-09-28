export const getSection = (SectionClass, css, opts = {}) => {
  const index = opts.index || 0;
  const sectionInstance = new SectionClass(css, index);
  const sectionNotFound = () => {
    browser.saveScreenshot();

    throw new Error(
      `${SectionClass.name} section with the selector ${css} not found.`
    );
  };

  return sectionInstance.section
    ? sectionInstance
    : opts.noThrow
      ? null
      : sectionNotFound();
};

export const getSections = (name, css) => {
  return [...Array($$(css).length).keys()].map(i => getSection(name, css, i));
};

export const getSectionByViewport = (sections, viewport = "base") => {
  return sections[viewport] ? sections[viewport] : sections.base;
};
