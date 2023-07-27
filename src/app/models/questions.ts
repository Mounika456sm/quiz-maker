
export interface questionAnswers {
    response_code: number;
    results: questionsList[];
}
export interface questionsList{
    category : string;
    type:string;
    difficulty :string;
    question: string;
    correct_answer: string;
    incorrect_answers:Array<string>;
    selectedAnswer:string;
    answeredIndex: number;
}

