import {createWriteStream} from 'fs';
import {get} from 'https';

export const download = (url: string, filename: string) => {
    return new Promise((resolve) => {
        const file = createWriteStream(filename);
        get(url, res => {
            res.pipe(file);
            file.on('finish', () => () => resolve("DONE"));
        });
    });
};
// download("https://input.fontbureau.com/build/?fontSelection=fourStyleFamily&regular=InputSans-Regular&italic=InputSans-Italic&bold=InputSans-Bold&boldItalic=InputSans-BoldItalic&a=0&g=0&i=0&l=0&zero=0&asterisk=0&braces=0&preset=default&line-height=1.2&accept=I+do&email=", "/Users/xdeepakv/github//input_font.zip");
