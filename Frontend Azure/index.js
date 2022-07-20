
function loadTable() {
    const pessoaRequest = new XMLHttpRequest();
    pessoaRequest.open("GET", "https://appgeral.azurewebsites.net/api/pessoa");
    pessoaRequest.setRequestHeader('Access-Control-Allow-Origin', '*');
    pessoaRequest.setRequestHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    pessoaRequest.setRequestHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    pessoaRequest.send();
    pessoaRequest.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        console.log(this.responseText);
        var trHTML = ''; 
        const objects = JSON.parse(this.responseText);
        for (let object of objects) {
          trHTML += '<tr>'; 
          trHTML += '<td>'+object.id+'</td>';
          trHTML += '<td>'+object.nome+'</td>';
          trHTML += '<td>'+object.cpf+'</td>';
          trHTML += '<td>'+object.idade+'</td>';
          trHTML += '<td>'+object.cidade+'</td>';
          trHTML += '<td>'+object.uf+'</td>';
          trHTML += '<td><button type="button" class="btn btn-outline-secondary" onclick="showPessoaEditBox('+object['id']+')">Edit</button>';
          trHTML += '<button type="button" class="btn btn-outline-danger" onclick="pessoaDelete('+object['id']+')">Del</button></td>';
          trHTML += "</tr>";
        }
        document.getElementById("mytable").innerHTML = trHTML;
      }
    };
  }
  
  loadTable();

  function showCidade() {
    Swal.fire({
        title: 'Cidades',
        html: '<table class="table">'+
        '<thead>'+
          '<tr>'+
              '<th scope="col">#</th>'+
              '<th scope="col">Nome</th>'+
              '<th scope="col">Estado</th>'+
          '</tr>'+
       ' </thead>'+
        '<tbody id="cidadeTable">'+
        '</tbody>'+
      '</table>',
        focusConfirm: false,
      })
   
    const pessoaRequest = new XMLHttpRequest();
    pessoaRequest.open("GET", "https://appgeral.azurewebsites.net/api/cidade");
    pessoaRequest.send();
    pessoaRequest.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            const objects = JSON.parse(this.responseText);
            var cidadeHtml = '';
            for (let object of objects) {
                cidadeHtml += '<tr>'; 
                cidadeHtml += '<td>'+object.id+'</td>';
                cidadeHtml += '<td>'+object.nome+'</td>';
                cidadeHtml += '<td>'+object.uf+'</td>';
                cidadeHtml += '<td><button type="button" class="btn btn-outline-danger" onclick="cidadeDelete('+object['id']+')">Del</button></td>';
                cidadeHtml += "</tr>";
              }
              document.getElementById("cidadeTable").innerHTML = cidadeHtml;
        }
    }
    
  }

  function showPessoaEditBox(id) {
    Swal.fire({
      title: 'Editar pessoa',
      html:
        '<input id="id" type="hidden">' +
        '<input id="pnome" class="swal2-input" placeholder="Nome">' +
        '<input id="pcpf" class="swal2-input" placeholder="CPF">' +
        '<input id="pidade" class="swal2-input" placeholder="Idade">' +
        '<input id="pcidadeid" class="swal2-input" placeholder="Codigo da cidade">',
      focusConfirm: false,
      preConfirm: () => {
        pessoaEdit(id, 
                    document.getElementById("pnome").value,
                    document.getElementById("pcpf").value,
                    document.getElementById("pidade").value,
                    document.getElementById("pcidadeid").value);  
      }
    })
}

function pessoaEdit(id, nome, cpf, idade, cidadeid)
{
    const xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "https://appgeral.azurewebsites.net/api/pessoa"+"/"+id);
    xhttp.setRequestHeader('Content-type','application/json; charset=utf-8');
    xhttp.send(JSON.stringify({ 
        "nome": nome, "cpf": cpf, "idade": idade, "cidadeid": cidadeid
      }));
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          const objects = JSON.parse(this.responseText);
          Swal.fire({title: 'Sucesso'});
          loadTable();
        }
        else
          {
              Swal.fire({title: 'Erro'});
            loadTable();
          }
      };
}


function showPessoaCreateBox() {
    Swal.fire({
      title: 'Cadastrar pessoa',
      html:
        '<input id="id" type="hidden">' +
        '<input id="pnome" class="swal2-input" placeholder="Nome">' +
        '<input id="pcpf" class="swal2-input" placeholder="CPF">' +
        '<input id="pidade" class="swal2-input" placeholder="Idade">' +
        '<input id="pcidadeid" class="swal2-input" placeholder="Codigo da cidade">',
      focusConfirm: false,
      preConfirm: () => {
        pessoaCreate();
      }
    })
  }

  function showCidadeCreateBox() {
    Swal.fire({
      title: 'Cadastrar Cidade',
      html:
        '<input id="id" type="hidden">' +
        '<input id="cnome" class="swal2-input" placeholder="Nome">' +
        '<input id="cuf" class="swal2-input" placeholder="UF">',
      focusConfirm: false,
      preConfirm: () => {
        cidadeCreate();
      }
    })
  }
  
  function pessoaCreate() {
    const pnome = document.getElementById("pnome").value;
    const pcpf = document.getElementById("pcpf").value;
    const pidade = document.getElementById("pidade").value;
    const pcidadeid = document.getElementById("pcidadeid").value;
      
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "https://appgeral.azurewebsites.net/api/pessoa");
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify({ 
      "Nome": pnome, "CPF": pcpf, "Idade": pidade, "Cidadeid": pcidadeid
    }));
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        const objects = JSON.parse(this.responseText);
        Swal.fire({title: 'Sucesso'});
        loadTable();
      }
      else
        {
            Swal.fire({title: 'Erro'});
          loadTable();
        }
    };
  }

  function cidadeCreate() {
    const cname = document.getElementById("cnome").value;
    const cuf = document.getElementById("cuf").value;
      
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "https://appgeral.azurewebsites.net/api/cidade");
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify({ 
      "Nome": cname, "UF": cuf,
    }));
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        const objects = JSON.parse(this.responseText);
        Swal.fire({title: 'Sucesso'});
        loadTable();
      }
      else
        {
            Swal.fire({title: 'Erro'});
          loadTable();
        }
    };
  }

  function pessoaDelete(id) {
    const xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "https://appgeral.azurewebsites.net/api/pessoa"+"/"+id);
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          const objects = JSON.parse(this.responseText);
          Swal.fire({title: 'Sucesso'});
          loadTable();
        }
        else
        {
            Swal.fire({title: 'Erro'});
          loadTable();
        }
      };
 }

 function cidadeDelete(id) {
    const xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "https://appgeral.azurewebsites.net/api/cidade"+"/"+id);
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          const objects = JSON.parse(this.responseText);
          Swal.fire({title: 'Sucesso'});
          loadTable();
        }
        else
        {
            Swal.fire({title: 'Erro'});
          loadTable();
        }
      };
 }