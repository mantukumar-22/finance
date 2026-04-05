class ApiFeatures {
    constructor(query, queryStr){
        this.query = query;
        this.queryStr = queryStr || {}
    }

    search(){
        const keyword = this.queryStr.keyword 
        ? {
            name : {
                $regex : this.queryStr.keyword, 
                $options : "i",
            },
        }: 
        [];

        // console.log(keyword)

        this.query = this.query.find({...keyword});

        return this;
    }

    filter(){
        const queryCopy = {...this.queryStr}
        // console.log(queryCopy);
        // Removing same filter for category
        const removeFilds = ["keyword", "page", "limit"];

        removeFilds.forEach(key => delete queryCopy[key]);

        // filter for Price and Rating
        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|It|Ite)\b/g, key => `$${key}`);
        
        this.queryStr = this.query.find(JSON.parse(queryStr));

        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }
}

export default ApiFeatures;