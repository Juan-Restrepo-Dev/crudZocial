    function RegisterAction(action){
    const date = new Date().toLocaleString();

    const history = JSON.parse(localStorage.getItem("Action")) || [];
    history.push({action,date});

    localStorage.setItem("Action",JSON.stringify(history));
    };
