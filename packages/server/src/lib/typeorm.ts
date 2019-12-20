import { ConnectionOptionsReader, createConnection } from 'typeorm';

export const typeorm = async () => {
  const connectionOptionsReader = new ConnectionOptionsReader({
    root: process.cwd(),
  });
  const connectionOptions = await connectionOptionsReader.get(
    process.env.NODE_ENV || 'development',
  );
  const connection = await createConnection({
    ...connectionOptions,
    name: 'default',
  });

  await connection.runMigrations();
};
