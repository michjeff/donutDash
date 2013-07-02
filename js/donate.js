var util = {
  braintree: Braintree.create('MIIBCgKCAQEAob6DqTTSIxicyQa6gtc+eIKSmC2H2qWYTTdpsoXcUkldYk7bfMdoD2yeUyEKGeUTCdGMQHtXteOh9zwRTVn5m/gceLMah/aVF1TPkqQZ6PgfLzLmMStrRvdpLQA0/cHWkAi/xZDVvJBVm8dvu/cUgtWSBjwHfqKYRkNHpi51PLfrWGW3STeZ/QxCtMLWH2CFRHcHsfDvY+ZUj6BfeBjDuz5qe7wHHrbGobYUW42KLMU2CGCriOoyuTTceKXKH1cTWegySihRUkg9D4PnKeMWtcmuEZ2YFchPUYZwFiD5HZwklI9Vz6fK+pTh0mTCSlikcS1WzT2hpbYlSDpOknsPOwIDAQAB'),
  payForm: $("#payment-form"),
  submitBttn: $("#submit"),

  formatCurrency: function (obj) {
    num = obj.value.toString().replace(/\$|\,/g, '');
    if (isNaN(num)) num = "0";
    num = Math.floor(num * 100 + 0.50000000001);
    cents = num % 100;
    num = Math.floor(num / 100).toString();
    if (cents < 10) cents = "0" + cents;
    obj.value = num + '.' + cents;
  },

  formatPhone: function (obj) {
    while (obj.value.charAt(0) === '1')
      obj.value = obj.value.substr(1);
    var numbers = obj.value.replace(/\D/g, ''),
      separator = {
        0: '(',
        3: ') ',
        6: ' - '
      };
    obj.value = '';
    for (var i = 0; i < numbers.length; i++)
      obj.value += (separator[i] || '') + numbers[i];
  },
};


$(function ($) {

  // Display/hide team div
  var teamDiv = $("#teamDiv"),
    teamType;
  $("input:radio[name='division']").change(function () {
    teamType = parseInt(this.value);
    if (teamType === 2) {
      teamDiv.slideDown("medium");
      $("#amount").val(39);
    } else {
      teamDiv.slideUp("medium");
      $("#amount").val(15);
    }
  });

  // Display/hide payment div
  var payDivs = [$("#ccDiv"), $("#paypalDiv"), $("#cashDiv")],
    amtBox = $("#amount");
  $("input:radio[name='payment']").change(function () {
    $(".payDivs").slideUp("medium");
    payDivs[parseInt(this.value)].slideDown("medium");
  });

  // Form validations
  $.validator.addMethod("min2", function (value, element) {
    if (teamType === 2) return value >= 39;
    return value >= 15;
  }, "The minimum entry fee for this division is $" + (teamType ===
    teamType && 2 ? 39 : 15) + ".");

  //Matches US phone and UK landline + mobile, accepting only 01-3 for landline or 07 for mobile to exclude many premium numbers
  $.validator.addMethod("phoneNum", function (phone_number, element) {
    phone_number = phone_number.replace(/\(|\)|\s+|-/g, '');
    return this.optional(element) || (phone_number.length > 9 && (
        phone_number.match(
          /^(?:(?:(?:00\s?|\+)44\s?|0)(?:1\d{8,9}|[23]\d{9}|7(?:[45789]\d{8}|624\d{6})))$/) ||
        phone_number.match(
          /^(\+?1-?)?(\([2-9]\d{2}\)|[2-9]\d{2})-?[2-9]\d{2}-?\d{4}$/)));
  }, 'Please specify a valid phone number');

  util.payForm.validate({
      onkeyup: false,
      rules: {
        firstName: {
          required: true
        },
        lastName: {
          required: true
        },
        email: {
          required: true,
          email: true,
          remote: {
            url: "check-email",
            type: "post"
          }
        },
        phone: "phoneNum",
        teammate1: {
          required: "#team:checked",
        },
        teammate2: {
          required: "#team:checked",
        },
        teamName: {
          required: "#team:checked"
        },
        amount: {
          required: "#typeCC:checked",
          min2: true
        },
        ccName: {
          required: "#typeCC:checked"
        },
        ccNumberenc: {
          required: "#typeCC:checked",
          creditcard: true
        },
        cvvenc: {
          required: "#typeCC:checked",
          digits: true
        },
        expMonthenc: {
          required: "#typeCC:checked",
          digits: true
        },
        expYearenc: {
          required: "#typeCC:checked",
          digits: true
        },
        zipCode: {
          digits: true
        }
      },
      messages: {
        email: {
          remote: "That address has already been registered."
        }
      }
    });

  // Submit form
  util.submitBttn.click(function (e) {
    if (!util.payForm.valid()) return;
    var formData = new Object();
    $("#payment-form input[type='text']").each(function () {
      var n = this.name;
      var v = $(this).val().trim();
      // Encrypt cc fields
      if (v)
        formData[n] = n.substr(-3, 3) === "enc" ? util.braintree.encrypt(v) :
          v;
    });
    formData["division"] = $("input[name=division]:checked").val();
    formData["payment"] = $("input[name=payment]:checked").val();
    //$(this).attr("disabled", "disabled");
    $.ajax({
        type: "POST",
        url: util.payForm.attr("action"),
        data: formData,
        dataType: "json",
        success: function (data) {
          if (data.err) $("#errorBox").append(data.err);
        },
        error: function (xhr, error) {
          console.debug(xhr);
          console.debug(error);
          debugger
        }
      });
  });


});