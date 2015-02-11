'use strict';
var isOperating = false;
var isFloating = false;
var toBeCleared = false;
var operator;
var operand;

$(document).ready(init);
function init() {
  $(document).keypress(function(e) {
    var code = e.keyCode;
    var id;
    if (code >= 48 && code <= 57) {
      $('#' + String.fromCharCode(code)).click();
    } else {
      console.log(code);
      switch (code) {
        case 46: id = '#period'; break;
        case 47: id = '#divide'; break;
        case 43: id = '#plus'; break;
        case 45: id = '#minus'; break;
        case 42: id = '#mult'; break;
        case 94: id = '#power'; break;
        case 99: id = '#clear'; break;
        case 114: id = '#root'; break;
        case 95: id = '#invert'; break;
        case 13:  // enter key
        case 61: id = '#equals'; break;
      }
    }
    $(id).click();
  });

  $('.num').on('click', function() {                // Number clicked
    if (($('#dis').val() === '0') || toBeCleared) { // Replace zero with first input
      toBeCleared = false;
      $('#dis').val($(this).attr('id'));
    } else {                                         // Concat new digit
      $('#dis').val($('#dis').val().concat($(this).attr('id')));
    }
  });
  $('.operator').on('click', function() {
    if (isOperating) {
      $('#dis').val(evaluate());
    }
    switch ($(this).attr('id')) {
      case 'plus':    operator = '+'; break;
      case 'minus':   operator = '−'; break;
      case 'mult':    operator = '×'; break;
      case 'divide':  operator = '÷'; break;
      case 'power':   operator = '^'; break;
    }
    operand = parseFloat($('#dis').val());
    isOperating = true;
    toBeCleared = true;
    $('#currOp').text(operator);
  });

  $('#invert').on('click', function() {
    $('#dis').val($('#dis').val() * -1);
  });

  $('#root').on('click', function() {
    $('#dis').val(Math.sqrt(evaluate()));
  });

  $('#decimal').on('click', function() {
    if (toBeCleared) {
      $('#dis').val('0.');
      toBeCleared = false;
    } else {
      if (!isFloating) {
        $('#dis').val($('#dis').val().concat('.'));
      }
    }
    isFloating = true;
  });

  $('#equals').on('click', function() {
    $('#dis').val(evaluate());
    reset();
  });

  $('#clear').on('click', function() {
    reset();
    $('#dis').val('0');
  });
}
function evaluate() {  // Evaluates displayed value with operator on operand
  var currVal = parseFloat($('#dis').val());
  var result;
  switch (operator) {
    case '+': result = operand + currVal; break;
    case '−': result = operand - currVal; break;
    case '×': result = operand * currVal; break;
    case '÷':
      if (currVal === 0) {
        result = 'Err';
      } else {
        result = operand / currVal;
      }
      break;
    case '^': result = Math.pow(operand, currVal); break;
    default: result = currVal;
  }
  return result;
}
function reset() {
  toBeCleared = true;
  isOperating = false;
  isFloating = false;
  operator = null;
  operand = null;
  $('#currOp').text('');
}
