import { IBaseEventContract } from './events.interface';

export type AiIngestionCompletedEventData = {
    jobId: string;
    sourceType: string;
    sourceId: string;
    chunksCount: number;
    embeddingModel: string;
    completedAt: string;
};

export class AiIngestionCompletedEventContract implements IBaseEventContract<AiIngestionCompletedEventData> {
    static readonly pattern = 'ai.ingestion.completed';
    readonly pattern = AiIngestionCompletedEventContract.pattern;
    readonly data: AiIngestionCompletedEventData;

    constructor(data: AiIngestionCompletedEventData) {
        this.data = data;
    }
}
