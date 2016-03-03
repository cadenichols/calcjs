'use strict';
var isOperating = false;
var isFloating = false;
var toBeCleared = false;
var operator;
var operand;

var $display;

$(document).ready(init);

function init() {
  $display = $('#dis');

  $(document).keypress(keyPressed);
  $('.num').on('click', numClicked);
  $('.operator').on('click', operatorClicked);
  $('#invert').on('click', invertClicked);
  $('#root').on('click', rootClicked);
  $('#decimal').on('click', decimalClicked);
  $('#equals').on('click', equalsClicked);
  $('#clear').on('click', clearClicked);
}

function numClicked() {
  var currVal = parseFloat($display.val());
  var clickedNum = $(this).text();

  if (currVal === 0 || toBeCleared) { // Replace zero with first input
    toBeCleared = false;
    $display.val(clickedNum);
  } else {                                         // Concat new digit
    $display.val(currVal + clickedNum);
  }
}

function operatorClicked() {
  if (isOperating) {
    $display.val(evaluate());
  }
  switch ($(this).attr('id')) {
    case 'plus':    operator = '+'; break;
    case 'minus':   operator = '−'; break;
    case 'mult':    operator = '×'; break;
    case 'divide':  operator = '÷'; break;
    case 'power':   operator = '^'; break;
  }
  operand = parseFloat($display.val());
  isOperating = true;
  toBeCleared = true;
  $('#currOp').text(operator);
}

function invertClicked() {
  $display.val($display.val() * -1);
}

function rootClicked() {
  $display.val(Math.sqrt(evaluate()));
}

function decimalClicked() {
  if (toBeCleared) {
    $display.val('0.');
    toBeCleared = false;
  } else {
    if (!isFloating) {
      $display.val($display.val().concat('.'));
    }
  }
  isFloating = true;
}

function equalsClicked() {
  $display.val(evaluate());
  reset();
}

function clearClicked() {
  reset();
  $display.val('0');
}

function evaluate() {  // Evaluates displayed value with operator on operand
  var currVal = parseFloat($display.val());
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

function keyPressed(e) {
  var code = e.keyCode;
  var id;
  if (code >= 48 && code <= 57) {
    $('#' + String.fromCharCode(code)).click();
  } else {
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
    $(id).click();
  }
}
