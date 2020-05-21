import app from '@config/app';
import { PORT } from '@shared/utils/env';

app.listen(PORT, () => console.log('Server is running'));
