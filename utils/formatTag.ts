export const formatTag = (tag: string) => {
  const regexForTag = /#/gi;
  const modifiedTag = tag.replace(regexForTag, '');

  return modifiedTag;
}