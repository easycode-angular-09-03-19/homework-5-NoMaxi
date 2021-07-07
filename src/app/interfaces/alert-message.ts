import { Album } from './album';
import { error } from 'selenium-webdriver';

export interface AlertMessage {
    type: string;
    object: Album;
    actionPerformed: string;
    errorMessage?: string;
}
