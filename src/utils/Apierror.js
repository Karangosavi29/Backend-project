class Apierror extends Error {
    consstructor(
        statusCode,
        message = 'Something went wrong',
        error =[],
        stack = ""
    ){
        super(message)
        this.statusCode = statusCode
        this.data= null
        this.message = message
        this.success = false;
        this.errors =this.errors; 

        if(stack){
            this.stack = stack
        }else{  
            error.captureStackTrace(this, this.constructor)
    }
}

}
export { Apierror }