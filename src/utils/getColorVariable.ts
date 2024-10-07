const getColorVariable = (variableName: string) => {
  return getComputedStyle(document.documentElement).getPropertyValue(
    variableName
  );
};

export default getColorVariable;
