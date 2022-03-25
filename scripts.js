(function() {
  var questions = [{
    question: "Siento que mi pareja valora lo que aporto a la relación",
    choices: ["Sí", "No"],
    correctAnswer: 0
  }, {
    question: "Me gusta el sexo con mi pareja",
    choices: ["Sí", "No"],
    correctAnswer: 0
  }, {
    question: "Nos da gusto vernos al final del día",
    choices: ["Sí", "No"],
    correctAnswer: 0
  }, {
    question: "Mi pareja es de mis mejores amigos",
    choices: ["Sí", "No"],
    correctAnswer: 0
  }, {
    question: "Me resulta cómodo expresarle lo que yo necesito",
    choices: ["Sí", "No"],
    correctAnswer: 0
  }, {
    question: "Me gusta cuando recibo una llamada de mi pareja",
    choices: ["Sí", "No"],
    correctAnswer: 0
  }, {
    question: "Mantenemos en privado nuestros problemas",
    choices: ["Sí", "No"],
    correctAnswer: 0
  }, {
    question: "Ambos valoramos lo que recibimos de parte del otro",
    choices: ["Sí", "No"],
    correctAnswer: 0
  }, {
    question: "Me gusta que mis opiniones estén influenciadas por el/ella",
    choices: ["Sí", "No"],
    correctAnswer: 0
  }, {
    question: "Utilizo frases que podría haber utilizado ella",
    choices: ["Sí", "No"],
    correctAnswer: 0
  }, {
    question: "Me escucha con respeto aunque no comparta mi opinión",
    choices: ["Sí", "No"],
    correctAnswer: 0
  }, {
    question: "Cuando necesito ayuda, mi pareja es buena opción",
    choices: ["Sí", "No"],
    correctAnswer: 0
  }, {
    question: "Compartimos los mismos valores de la vida",
    choices: ["Sí", "No"],
    correctAnswer: 0
  }, {
    question: "Mi pareja y yo podemos charlar durante horas",
    choices: ["Sí", "No"],
    correctAnswer: 0
  }, {
    question: "Siento que yo soy mejor persona gracias a mi pareja",
    choices: ["Sí", "No"],
    correctAnswer: 0
  }, {
    question: "Sé quién es la persona en quien más confía mi pareja",
    choices: ["Sí", "No"],
    correctAnswer: 0
  }, {
    question: "Sé cuál es su interés principal en este momento",
    choices: ["Sí", "No"],
    correctAnswer: 0
  }, {
    question: "Sé quiénes son las últimas personas que la hicieron enojar",
    choices: ["Sí", "No"],
    correctAnswer: 0
  }, {
    question: "Tengo claro cuáles con las metas en la vida de mi pareja",
    choices: ["Sí", "No"],
    correctAnswer: 0
  }, {
    question: "Tengo clara la filosofía de vida de mi pareja",
    choices: ["Sí", "No"],
    correctAnswer: 0
  }, {
    question: "Tengo claro quiénes de su familia le caen mejor",
    choices: ["Sí", "No"],
    correctAnswer: 0
  }, {
    question: "Sé qué personas de su familia le resultan molestas",
    choices: ["Sí", "No"],
    correctAnswer: 0
  }, {
    question: "Siento que mi pareja me conoce muy bien",
    choices: ["Sí", "No"],
    correctAnswer: 0
  }, {
    question: "Siento que puedo ser yo misma estando con mi pareja",
    choices: ["Sí", "No"],
    correctAnswer: 0
  }, {
    question: "Cuando pienso en mi pareja, me siento bien",
    choices: ["Sí", "No"],
    correctAnswer: 0
  }, {
    question: "Nos gusta besarnos",
    choices: ["Sí", "No"],
    correctAnswer: 0
  }, {
    question: "Si estamos cerca, tenemos contacto de forma cariñosa",
    choices: ["Sí", "No"],
    correctAnswer: 0
  }, {
    question: "Siento que mi pareja me trata con respeto",
    choices: ["Sí", "No"],
    correctAnswer: 0
  }, {
    question: "El romance es una parte importante de nuestra relación",
    choices: ["Sí", "No"],
    correctAnswer: 0
  }];
  
  var questionCounter = 0; //Tracks question number
  var selections = []; //Array containing user choices
  var quiz = $('#quiz'); //Quiz div object
  console.log(selections);
  var numPreg = 5;
    var dif;
  // Display initial question
  displayNext();
  
  // Click handler for the 'next' button
  $('#next').on('click', function (e) {
    e.preventDefault();
    
    // Suspend click listener during fade animation
    if(quiz.is(':animated')) {        
      return false;
    }
    choose();
    
    // If no user selection, progress is stopped
    var siguiente = true;
      
      for(var temp = 0; temp < numPreg; temp++) { 
        if (isNaN(selections[(questionCounter * 5) + temp])) {
          siguiente = false;
        } 
      }
      
     if (siguiente == false) {
          alert('Asegúrate de seleccionar una respuesta para todas las preguntas');
     } else {
          questionCounter++;
          displayNext();
    }
  });
  
  // Click handler for the 'prev' button
  $('#prev').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }
    choose();
    questionCounter--;
    displayNext();
  });
  
  // Click handler for the 'Start Over' button
  $('#start').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }
    questionCounter = 0;
    selections = [];
    displayNext();
      numPreg = 5;
    $('#start').hide();
  });
  
  // Animates buttons on hover
  $('.button').on('mouseenter', function () {
    $(this).addClass('active');
  });
  $('.button').on('mouseleave', function () {
    $(this).removeClass('active');
  });
  
  // Creates and returns the div that contains the questions and 
  // the answer selections
  function createQuestionElement(index) {
    var qElement = $('<div>', {
      id: 'question'
    });
    
    for(var temp = 0; temp < numPreg; temp++) {
        var header = $('<h2>Pregunta ' + ((index * 5) + temp + 1) + ':</h2>');
        qElement.append(header);

        var question = $('<p>').append(questions[(index * 5) + temp].question);
        qElement.append(question);

        var radioButtons = createRadios((index * 5) + temp);
        qElement.append(radioButtons);

    }
    return qElement;
  }
  
  // Creates a list of the answer choices as radio inputs
  function createRadios(index) {
    var radioList = $('<ul class="opciones">');
    var item;
    var input = '';
    for (var i = 0; i < questions[index].choices.length; i++) {
      item = $('<li>');
      input = '<input type="radio" name="answer-'+index+'" value=' + i + ' />';
      input += questions[index].choices[i];
      item.append(input);
      radioList.append(item);
    }
    return radioList;
  }
  
  // Reads the user selection and pushes the value to an array
  function choose() {
      for(var temp = 0; temp < 5; temp++){
        selections[((questionCounter * 5) + temp)] = +$('input[name="answer-'+ ((questionCounter * 5) + temp) +'"]:checked').val();
      }
  }
  
  // Displays next requested element
  function displayNext() {
    quiz.fadeOut(function() {
      $('#question').remove();
      
        
      if(((questionCounter * 5) + 5) < (questions.length)){

        var nextQuestion = createQuestionElement(questionCounter);  
          
        quiz.append(nextQuestion).fadeIn();
        for(var temp = 0; temp < 5; temp++) {
            if (!(isNaN(selections[(questionCounter * 5) + temp]))) {
              $('input[value='+selections[(questionCounter * 5) + temp]+'][name="answer-'+ ((questionCounter * 5) + temp) +'"]').prop('checked', true);
            }
        }
          
        // Controls display of 'prev' button
        if(questionCounter === 1){
          $('#prev').show();
        } else if(questionCounter === 0){
          
          $('#prev').hide();
          $('#next').show();
        }
      } else if((((questionCounter - 1) * 5) + numPreg) == questions.length) {
        var scoreElem = displayScore();
        quiz.append(scoreElem).fadeIn();
        $('#next').hide();
        $('#prev').hide();
        $('#start').show();
      }
        else if(((questionCounter * 5) + 5) > questions.length) {
          dif = ((questionCounter * 5) + 5) - questions.length;
          numPreg = questions.length - ((questionCounter * (numPreg - dif)) + numPreg);

        var nextQuestion = createQuestionElement(questionCounter);  
          
        quiz.append(nextQuestion).fadeIn();
        for(var temp = 0; temp < 5; temp++) {
            if (!(isNaN(selections[(questionCounter * 5) + temp]))) {
              $('input[value='+selections[(questionCounter * 5) + temp]+'][name="answer-'+ ((questionCounter * 5) + temp) +'"]').prop('checked', true);
            }
        }
          
        // Controls display of 'prev' button
        if(questionCounter === 1){
          $('#prev').show();
        } else if(questionCounter === 0){
          
          $('#prev').hide();
          $('#next').show();
        }
          
      } 
    });
  }
  
  // Computes score and returns a paragraph element to be displayed
  function displayScore() {
    var score = $('<p>',{id: 'question'});
    
    var numCorrect = 0;
    for (var i = 0; i < (selections.length - dif); i++) {
      if (selections[i] === questions[i].correctAnswer) {
        numCorrect++;
      }
    }
    if (numCorrect < 9) {
        score.append('Tu relación está en serios problemas, si este resultado te sorprende, es probableque estés tan inmerso en patrones de conducta nocivos que haz llegado a normalizar prácticas que te pudieran estar haciendo daño. La parte positiva puede ser que ambos estén cumpliendo las formas de una relación de pareja para tratar de evitar el dolor de una separación o para cuidar que sus intereses comunes, especialmente que sus hijos no sufran. Si es el caso, te felicito por tu esfuerzo, pero te aseguro que hay formas de resolver tus problemas y reestructurar la familia para que puedan seguir funcionando. ¡No tienes que vivir así!');
    } else if (numCorrect < 22) {
        score.append('Tu relación tiene fortalezas pero también tiene diversas áreas por mejorar. Este puede ser un momento decisivo para atender y fortalecer la relación o dejarla a la deriva hasta un punto en que podría ya no ser rescatable. Es tu decisión invertir tiempo y recursos para que los problemas se conviertan en oportunidades, y que esos nuevos recursos puedan ayudar a fortalecer el vínculo, mejorando la relación y generando mayor satisfacción entre tu pareja y tú. Incluso si te llegas a divorciar, es muy distinto si lo haces enojado, resentido, dolido, que si haces el trabajo previo de maduración y de sanar tu parte de la relación. Es muy recomendable invertir en ti, en terapia, en cursos de desarrollo personal, enlectura de libros especializados, en mediación de pareja.');
    } else if (numCorrect > 21) {
        score.append('Tú seguramente te sientes muy bien con tu relación de pareja, ¡te felicito! Es muy probable que eso no sea obra de la casualidad y que te haya costado mucho tiempo, esfuerzo y recursos estar en donde estás. Te sugiero que sigas invirtiendo en ti y en tu relación. Las únicas personas que podrían no tener problemas de pareja son aquellas que no tienen pareja. Así que seguir esperando lo mejor, pero estando preparados para tiempos difíciles no solo buscando el buen funcionamiento de tu relación de pareja, sino para tener herramientas adecuadas para respaldar a tus seres queridos como hijos, amigos o padres, es una decisión muy sabia y que puede llegar incluso a ser divertida.');
               }

    return score;
  }
})();