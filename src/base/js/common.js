export const NumberCheck = (rule, value, callback) =>{
	if(!value){
		callback(new Error('请输入数字')) ;
		return;
	}
	if(!Number.isInteger(value-0)){
		callback(new Error('请输入数字')) 
	}else{
		callback();
	}
}
