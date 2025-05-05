export function parseGpsPacket(hex: string) {
  const type = hex.slice(10, 12);
  if (type !== '02') return null;

  const timestamp = parseInt(hex.slice(16, 24), 16);
  const direction = parseInt(hex.slice(24, 28), 16) / 100;
  const odo = parseInt(hex.slice(28, 36), 16);
  const horimeter = parseInt(hex.slice(36, 44), 16);
  const status = parseInt(hex.slice(44, 48), 16);
  const speed = parseInt(hex.slice(48, 50), 16);
  const lat = parseInt(hex.slice(50, 58), 16) / 1e6;
  const lon = parseInt(hex.slice(58, 66), 16) / 1e6;

  return {
    timestamp: new Date(timestamp * 1000),
    direction,
    odo,
    horimeter,
    gpsFix: !!(status & 0b1000000000000000),
    historical: !!(status & 0b0100000000000000),
    ignitionOn: !!(status & 0b0010000000000000),
    lat: status & 0b0001000000000000 ? -lat : lat,
    lon: status & 0b0000100000000000 ? -lon : lon,
    speed,
  };
}
