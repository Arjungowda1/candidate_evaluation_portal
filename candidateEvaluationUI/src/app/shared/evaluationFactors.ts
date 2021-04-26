export class Weightages{
    weightage_id:number;
    evaluationFactor: string;
    weightage:number;
    created_by:string;
    createdDate:string ;
    active:boolean;

    constructor(evaluationFactor:string, weightage:number){
        this.evaluationFactor = evaluationFactor;
        this.weightage = weightage;
    }
}


export const EvaluationFactors=[
    {
        "weightage_id": 0 ,
        "evaluationFactor": "Education",
        "weightage": 0,
        "created_by": "",
        "createdDate": "",
        "active": true
    },
    {
        "weightage_id": 0 ,
        "evaluationFactor": "Programming Skills",
        "weightage": 0,
        "created_by": "",
        "createdDate": "",
        "active": true
    },
    {
        "weightage_id": 0 ,
        "evaluationFactor": "Adaptibility",
        "weightage": 0,
        "created_by": "",
        "createdDate": "",
        "active": true
    },
    {
        "weightage_id": 0 ,
        "evaluationFactor": "Problem Solving",
        "weightage": 0,
        "created_by": "",
        "createdDate": "",
        "active": true
    },
    {
        "weightage_id": 0 ,
        "evaluationFactor": "Logical Skills",
        "weightage": 0,
        "created_by": "",
        "createdDate": "",
        "active": true
    },
    {
        "weightage_id": 0 ,
        "evaluationFactor": "Interpersonal Skills",
        "weightage": 0,
        "created_by": "",
        "createdDate": "",
        "active": true
    },
    {
        "weightage_id": 0 ,
        "evaluationFactor": "Cut off Marks",
        "weightage": 0,
        "created_by": "",
        "createdDate": "",
        "active": true
    }
]