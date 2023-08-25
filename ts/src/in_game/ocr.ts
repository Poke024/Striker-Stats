import * as Tesseract from "tesseract.js";

export class ScreenshotReader {
    private scheduler: Tesseract.Scheduler;

    public constructor() {
        this.scheduler = Tesseract.createScheduler();
    }

    private clean_result(text: string) {
        let to_remove : Array<string> = ["\n", "/", "\'", "-"];
        to_remove.forEach((targ) => {
            text = text.replace(targ, " ");
        })
        return text.trim();
    }

    private async genWorker() {
        const worker = await Tesseract.createWorker();
        // await worker.setParameters({
        //     tessedit_pageseg_mode: Tesseract.PSM.SINGLE_BLOCK_VERT_TEXT,
        // })
        await worker.loadLanguage('eng');
        await worker.initialize('eng');
        this.scheduler.addWorker(worker);
    }

    public async set_workers(workers: number) {
        if (workers == 0) {
            throw new Error("Cannot set number of workers to zero.")
        }

        if (this.scheduler.getNumWorkers() != 0) {
            this.scheduler.terminate();
        }
        const resArr = Array(workers);
        for (let i = 0; i < workers; i++) {
            resArr[i] = this.genWorker();
        }
        await Promise.all(resArr);
    }


    public async run_single(url: string) {
        if (url == "" || url == undefined) {
            throw new Error("Cannot run without an image url.")
        }

        let result: string = "";
        await this.scheduler.addJob('recognize', url).then((output) => result = output.data.text)
        return this.clean_result(result);
    }

    public async run_multi(urls: Array<string>) {
        if (urls?.length < 1) {
            throw new Error("Cannot run without any image urls.")
        }

        let results: Array<string> = [];
        await Promise.all(urls?.map((val) => (
            this.scheduler.addJob('recognize', val).then((output) => results.push(this.clean_result(output.data.text)))
        )))
        return results;
    }

    public async clear_workers() {
        if (this.scheduler.getNumWorkers() == 0) {
            throw new Error('Cannot clear workers with none in scheduler.')
        }
        this.scheduler.terminate();
    }
}