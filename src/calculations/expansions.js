function linearExpansion(initialWidth, linearCoefficient, temperaturaChange) {
  return initialWidth * linearCoefficient * temperaturaChange;
}

function superficialExpansion(
  initialSurface,
  superficialCoefficient,
  temperaturaChange,
) {
  return initialSurface * superficialCoefficient * temperaturaChange;
}

function volumetricExpansion(
  initialVolume,
  volumetricCoefficient,
  temperaturaChange,
) {
  return initialVolume * volumetricCoefficient * temperaturaChange;
}

export { linearExpansion, superficialExpansion, volumetricExpansion };
