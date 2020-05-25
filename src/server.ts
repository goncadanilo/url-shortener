import app from '@shared/infra/http/app';
import { PORT } from '@shared/utils/env';

app.listen(PORT, () => console.log('Server is running'));
