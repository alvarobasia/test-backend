import net from 'net';

const packetHex =
  '50F70A3F73025EFCF950156F017D784000008CA0F80084003C013026A1029E72BD73C4';
const packetBuffer = Buffer.from(packetHex, 'hex');

const client = new net.Socket();
client.connect(5001, 'localhost', () => {
  console.log('Enviando pacote...');
  client.write(packetBuffer);
  client.end();
});
