import { isTokenExpired, checkTokenUser } from '../Auth/UseTokenAuth';

let error;

export async function apiCall (url, method, bodyData){
    const token = JSON.parse(localStorage.getItem('token'));
    if(token?.token){
        const tokenCode = token?.token;

        if( isTokenExpired(tokenCode) == true ){
            throw new Response('', {
            status:404,
            statusText: 'Your token is expired. Please enter your credentials again',
        })} 

        try{
            return await fetch( url ,{
                method: method,
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization : `Bearer ${tokenCode}`,
                },
                body: JSON.stringify(bodyData),
            })
            .then(resp => resp.json())
        }
        catch(err){
            console.error(err);
            return error;
        }
    }
    // If the token is not in LocalStorage, the tokenCode must be set null to activate the other error codes for layout, user and student tab
    else{ 
        const tokenCode = null;
        return tokenCode;
    }
    
}

export async function getAllUsers(){
    try{
        const url = '/api/user';
        const method = 'GET';
        return apiCall(url, method);
    } 
    catch(err){
        console.error(err);
    }
}

export async function getUserById(id){
    try{
        return(
            await getAllUsers().then((users) => {
            // We filter the list of users with the user id argument that we give to the function
            // As the API send an array of objects, once we filter it, it still is an array with one object.
                return (users.filter( (element) =>  (element.id) == id))[0]
            })
        )
    } 
    catch(err){
        console.error(err);
    }  
}

export async function isUserDuplicate(email, dni){
    try{
        return(
            await getAllUsers().then((users) => {
                const duplicateEmail = (users.filter( (element) =>  (element.email) == email))[0];
                const duplicateDni = (users.filter( (element) =>  (element.dni) == dni))[0];

                const isDuplicate = duplicateEmail != undefined || duplicateDni != undefined

                return {isDuplicate};
            })
        )
    } 
    catch(err){
        console.error(err);
    }  
}

export async function getAllStudents(){
    try{
        const url = '/api/student';
        const method = 'GET';
        return apiCall(url, method);
    } 
    catch(err){
        console.error(err);
    }
}

export async function getStudentById(studentId){
    try{
        return (
            await getAllStudents().then((students) => {
                return (students.filter( (element) =>  (element.id) == studentId)[0] )
            })
        ) 
    } 
    catch(err){
        console.error(err);
    }
}

export async function getAllTeachers(){
    try{
        const url = '/api/teacher';
        const method = 'GET';
        return apiCall(url, method);
    }
    catch(err){
        console.error(err);
    }
}

export async function getTeacherByUserIdFromToken(){
    try{
        const userId = await checkTokenUser().then(user => user.id );
        return(
            await getAllTeachers().then((teachers) => {
                return( teachers.filter( (element) =>  (element.user_id) == userId)[0] );
            })
        )
    }
    catch(err){
        console.error(err);
    }
}

export async function getTeacherByUserIdFromParams(userIdParams){
    try{
        return(
            await getAllTeachers().then((teachers) => {
                return( teachers.filter( (element) =>  (element.user_id) == userIdParams)[0] );
            })
        )
    }
    catch(err){
        console.error(err);
    }
}

export async function getStudentsByTeacher(){
    try{
        const teacherId = await getTeacherByUserIdFromToken().then( teacher => teacher.id);
        return await getAllStudents().then((students) => {
            return ( students.filter( (element) =>  (element.teacher_id) == teacherId) )
        });
    }
    catch(err){
        console.error(err);
    }
}

export async function isStudentDuplicate(email, dni){
    try{
        return(
            await getAllStudents().then((students) => {
                const duplicateEmail = (students.filter( (element) =>  (element.email) == email))[0];
                const duplicateDni = (students.filter( (element) =>  (element.dni) == dni))[0];

                const isDuplicate = duplicateEmail != undefined || duplicateDni != undefined
                
                return {isDuplicate};
            })
        )
    } 
    catch(err){
        console.error(err);
    }  
}

export async function doesTheTeacherIdFromStudentExists(teacherId){
    try{
        return(
            await getAllTeachers().then((teachers) => {
                const teacher = (teachers.filter( (element) =>  (element.id) == teacherId))[0];
                const teacherDoesntExist = (teacher === undefined);

                return {teacherDoesntExist};
            })
        )
    } 
    catch(err){
        console.error(err);
    }  
}

export async function isTeacherDuplicate(email, dni){
    try{
        return(
            await getAllTeachers().then((teachers) => {
                const duplicateEmail = (teachers.filter( (element) =>  (element.email) == email))[0];
                const duplicateDni = (teachers.filter( (element) =>  (element.dni) == dni))[0];

                const isDuplicate = duplicateEmail != undefined || duplicateDni != undefined
                
                return {isDuplicate};
            })
        )
    } 
    catch(err){
        console.error(err);
    }  
}

export async function doesTheUserIdFromTeacherExists(userId){
    try{
        return(
            await getAllUsers().then((users) => {
                const user = (users.filter( (element) =>  (element.id) == userId))[0];
                const userExists = (user != undefined);

                return userExists;
            })
        )
    } 
    catch(err){
        console.error(err);
    }  
}

export async function deleteStudent( id ){
    try{
        const url = `/api/student/${id}`;
        const method = 'DELETE';

        return apiCall(url, method);
    }
    catch(err){
        console.error(err);
    }
}

export async function deleteUser( id ){
    try{
        const url = `/api/user/${id}`;
        const method = 'DELETE';

        return apiCall(url, method);
    }
    catch(err){
        console.error(err);
    }
}

export async function createUser(formData){
    try{
        const body = Object.fromEntries(formData);
        const url = `/api/user`;
        const method = 'POST';

        return apiCall(url, method, body);
    }
    catch(err){
        console.error(err);
    }
}

export async function createTeacher(formData){
    try{
        const body = Object.fromEntries(formData);
        const url = `/api/teacher`;
        const method = 'POST';

        return apiCall(url, method, body);
    }
    catch(err){
        console.error(err);
    }
}

export async function createStudent(formData){
    try{
        const body = Object.fromEntries(formData);
        const url = `/api/student`;
        const method = 'POST';

        return apiCall(url, method, body);
    }
    catch(err){
        console.error(err);
    }
}