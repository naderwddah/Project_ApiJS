document.addEventListener("DOMContentLoaded", function () {
  $(".page").hide();
  fetch("http://localhost/api/get_users.php") // استبدل بـ URL الـ API الخاص بك
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "success") {
        const users = data.users;
        const tbody = document.querySelector("table tbody");
        tbody.innerHTML = ""; // تنظيف الجدول قبل إضافة البيانات الجديدة

        users.forEach((user, index) => {

          const row = `
                      <tr data-id="${user.Id}">
                          <th scope="row">${index + 1}</th>
                          <td>${user.Name}</td>
                          <td>${user.CardNo}</td>
                          <td>${user.ServessId}</td>
                          <td>${user.AreaId}</td>
                          <td>
                          <button type="button" class="btn btn-primary btn-sm" onclick="editUser(${
                            user.Id
                          }, this)">تعديل</button>                             
                          <button type="button" class="btn btn-danger btn-sm" onclick="deleteUser(${
                            user.Id
                          }, this)">حذف</button> 
                          <button type="button" class="btn btn-danger btn-sm" onclick="viewBill(${
                            user.Id
                          }, '${encodeURIComponent(user.Name)}')">  الفواتير </button>
                         </td>
                      </tr>
                  `;
          tbody.innerHTML += row;
          
        });
        const userSelect = document.getElementById("user");
            data.users.forEach((user) => {
              const option = document.createElement("option");
              option.value = user.Id;
              option.textContent = user.Name;
              userSelect.appendChild(option);
            });
      } else {
        console.error("Error:", data.message);
      }
    })
    .catch((error) => console.error("Error fetching users:", error));

  // ! * * * * * * * * * * * * * * ****************************************************************
  fetch("http://localhost/api/get_emp.php") // استبدل بـ URL الـ API الخاص بك
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "success") {
        const employes = data.employed;
        const tbody = document.getElementById("Emp-table-body");
        tbody.innerHTML = ""; // تنظيف الجدول قبل إضافة البيانات الجديدة

        employes.forEach((emp, index) => {
          const row = `
                      <tr data-id="${emp.Id}">
                          <th scope="row">${index + 1}</th>
                          <td>${emp.Name}</td>
                          <td>${emp.EmpCerd}</td>
                          <td>${emp.Salary}</td>
                          <td>${emp.Manage == 1 ? "مدير " : "موظف"}</td>
                          <td>
                          <button type="button" class="btn btn-primary btn-sm" onclick="editemp(${
                            emp.Id
                          }, this)">تعديل</button>                             
                          <button type="button" class="btn btn-danger btn-sm" onclick="deleteemp(${
                            emp.Id
                          }, this)">حذف</button> 
                         </td>
                      </tr>
                  `;
          tbody.innerHTML += row;
        });
      } else {
        console.error("Error:", data.message);
      }
    })
    .catch((error) => console.error("Error fetching users:", error));

  // ! * * * * * * * * * * * * * *View Payment ****************************************************************
  fetch(`http://localhost/api/get_payments.php`) // استخدم الـ URL الخاص بك هنا
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "success") {
        const users = data.data;
        const tbody = document.getElementById("payment-card-body");
        tbody.innerHTML = ""; // تنظيف الجدول قبل إضافة البيانات الجديدة

        users.forEach((user, index) => {
          const row = `  
  <div class="card text-center">  
      <div class="card-header">${decodeURIComponent(name)}</div>  
      <div class="card-body">  
        <table class="table bg-white rounded shadow-sm table-hover"> 
               <th>
              <th>الاسم  </th>
              <th>طريقة الدفع  </th>
              <th>المبلغ المدفوع </th>
              <th>تاريخ الدفع  </th>
            </th>
          <tr data-id="${user.us_Id}">  
            <th scope="row">${index + 1}</th>  
            <td>${user.name}</td>  
            <td>${user.method}</td>  
            <td>${user.amount}</td>  
            <td>${user.payment_date}</td>  
          </tr>  
        </table>  
      </div>  
        <div class="card-footer text-body-secondary">  
                            <button class="btn btn-primary" onclick="printInvoice(${
                              user.us_Id
                            }, '${user.name}', '${user.method}', ${
            user.amount
          }, '${user.payment_date}')">طباعة</button>  
                        </div>
    </div>  
    <br />  
  </div>  
  `;
          tbody.innerHTML += row; // يمكنك أيضًا استخدام insertAdjacentHTML
        });
      } else {
        console.error("Error:", data.message);
      }
    })
    .catch((error) => console.error("Error fetching users:", error));

// ! * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
});

// ! * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
document.getElementById("userForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const eId = document.getElementById("eId").value;
  const areaId = document.getElementById("areaId").value;
  const name = document.getElementById("name").value;
  const cardNo = document.getElementById("cardNo").value;
  const servessId = document.getElementById("servessId").value;

  const userData = {
    EId: eId,
    AreaId: areaId,
    Name: name,
    CardNo: cardNo,
    ServessId: servessId,
  };

  fetch("http://localhost/api/addUser.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      return response.json();
    })
    .then((data) => {
      if (data.status === "success") {
        Swal.fire("تم!", "تم حفظ بيانات المستخدم بنجاح", "success");
        document.getElementById("eId").value = "";
        document.getElementById("areaId").value = "";
        document.getElementById("name").value = "";
        document.getElementById("servessId").value = "";
        document.getElementById("cardNo").value = "";
      } else {
        Swal.fire("خطأ!", "فشل في حفظ البيانات", "error");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      Swal.fire("خطأ!", "حدث خطأ أثناء الاتصال بالخادم", "error");
    });
});

// ! * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// دالة لحذف المستخدم
function deleteUser(userId, button) {
  if (confirm("هل أنت متأكد من حذف هذا المستخدم؟")) {
    fetch("http://localhost/api/delet.php", {
      // استبدل بـ URL الـ API الخاص بك
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: userId }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
        Swal.fire("تم!", "تم حذف بيانات المستخدم بنجاح", "success");

          // alert("تم حذف المستخدم بنجاح");
          // إزالة الصف من الجدول
          const row = button.closest("tr");
          row.remove();
        } else {
          alert("فشل حذف المستخدم: " + data.message);
        }
      })
      .catch((error) =>Swal.fire("خطأ!", "حدث خطأ أثناء الاتصال بالخادم", "error")
    );
  }
}
function editUser(userId, button) {
  // جلب بيانات المستخدم الحالية (يمكنك جلبها من الجدول أو من الخادم)
  const row = button.closest("tr");
  const name = row.querySelector("td:nth-child(2)").textContent;
  const cardNo = row.querySelector("td:nth-child(3)").textContent;
  const servessId = row.querySelector("td:nth-child(4)").textContent;
  const areaId = row.querySelector("td:nth-child(5)").textContent;

  // عرض نافذة SweetAlert مع حقول التعديل
  Swal.fire({
    title: "تعديل بيانات المستخدم",
    html:
      `<input id="swal-input1" class="swal2-input" placeholder="الاسم" value="${name}">` +
      `<input id="swal-input2" class="swal2-input" placeholder="رقم البطاقة" value="${cardNo}">` +
      `<input id="swal-input3" class="swal2-input" placeholder="معرف الخدمة" value="${servessId}">` +
      `<input id="swal-input4" class="swal2-input" placeholder="معرف المنطقة" value="${areaId}">`,
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonText: "حفظ التعديلات",
    cancelButtonText: "إلغاء",
    preConfirm: () => {
      return {
        name: document.getElementById("swal-input1").value,
        cardNo: document.getElementById("swal-input2").value,
        servessId: document.getElementById("swal-input3").value,
        areaId: document.getElementById("swal-input4").value,
      };
    },
  }).then((result) => {
    if (result.isConfirmed) {
      const updatedData = result.value;

      // إرسال البيانات المحدثة إلى الخادم
      fetch(`http://localhost/api/update_user.php?id=${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === "success") {
            Swal.fire("تم!", "تم تحديث بيانات المستخدم بنجاح", "success");
            // تحديث الصف في الجدول
            row.querySelector("td:nth-child(2)").textContent = updatedData.name;
            row.querySelector("td:nth-child(3)").textContent =
              updatedData.cardNo;
            row.querySelector("td:nth-child(4)").textContent =
              updatedData.servessId;
            row.querySelector("td:nth-child(5)").textContent =
              updatedData.areaId;
          } else {
            Swal.fire("خطأ!", "فشل في تحديث البيانات", "error");
          }
        })
        .catch((error) => {
          Swal.fire("خطأ!", "حدث خطأ أثناء الاتصال بالخادم", "error");
        });
    }
  });
}

// !--------------------------------------------View Bill Information --------------------------------
function viewBill(id, name) {
  console.log("view Bill Information");
  $(".page").hide(); // إخفاء جميع الصفحات
  $("#billList").show();
  fetch(`http://localhost/api/get_bills.php?user_id=${id}`) // استخدم الـ URL الخاص بك هنا
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "success") {
        const users = data.users;
        const tbody = document.getElementById("billusers-card-body");
        tbody.innerHTML = ""; // تنظيف الجدول قبل إضافة البيانات الجديدة

        users.forEach((user, index) => {
          const row = `  
          <div class="card text-center">  
              <div class="card-header">${decodeURIComponent(name)}</div>  
              <div class="card-body">  
                <table class="table bg-white rounded shadow-sm table-hover">  
                  <tr data-id="${user.Id}">  
                    <th scope="row">${index + 1}</th>  
                    <td>${user.Date}</td>  
                    <td>${user.L_Read}</td>  
                    <td>${user.N_Read}</td>  
                    <td>${user.Value}</td>  
                  </tr>  
                </table>  
              </div>  
              <div class="card-footer text-body-secondary">غير مدفوع </div>  
            </div>  
            <br />  
          </div>  
          `;
          tbody.innerHTML += row; // يمكنك أيضًا استخدام insertAdjacentHTML
        });
      } else {
        console.error("Error:", data.message);
      }
    })
    .catch((error) => console.error("Error fetching users:", error));
}

// ! ----------------------Emploed------------------------------------------
document
  .getElementById("registerForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const Salary = document.getElementById("Salary").value;
    const Manage = document.getElementById("Manage").value;
    const Normal = document.getElementById("Normal").value;
    const EmpCerd = document.getElementById("EmpCerd").value;
    fetch("http://localhost/api/addEmp.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        EmpCerd: EmpCerd,
        Salary: Salary,
        Manage: Manage,
        Normal: Normal,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        const messageElement = document.getElementById("reg_message");
        if (data.status === "success") {
          Swal.fire("تم!", "تم حفظ بيانات المستخدم بنجاح", "success");
          document.getElementById("username").value = "";
          document.getElementById("Salary").value = "";
          document.getElementById("Manage").value = "";
          document.getElementById("Normal").value = "";
          document.getElementById("EmpCerd").value = "";
        } else {
          Swal.fire("خطأ!", "فشل في حفظ البيانات", "error");
        }
      })
      .catch((error) => {
        console.error("خطأ:", error); // عرض الخطأ في وحدة التحكم
        Swal.fire("خطأ!", "حدث خطأ أثناء الاتصال بالخادم", "error");
      });
  });
function deleteemp(userId, button) {
  if (confirm("هل أنت متأكد من حذف هذا المستخدم؟")) {
    fetch("http://localhost/api/delet_emp.php", {
      // استبدل بـ URL الـ API الخاص بك
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: userId }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          // alert("تم حذف المستخدم بنجاح");
          Swal.fire("تم!", "تم حذف  بيانات المستخدم  بنجاح", "success");
          // إزالة الصف من الجدول
          const row = button.closest("tr");
          row.remove();
        } else {
          // alert("فشل حذف المستخدم: " + data.message);
          Swal.fire("تم!", "فشل  حذف  بيانات المستخدم  بنجاح", "error");
        }
      })
      .catch((error) =>
        Swal.fire("خطأ!", "حدث خطأ أثناء الاتصال بالخادم", "error")
      );
  }
}
// ! **************** * * * * * * * * * * * * * * * * * * * * *
function editemp(userId, button) {
  // جلب بيانات المستخدم الحالية (يمكنك جلبها من الجدول أو من الخادم)
  const row = button.closest("tr");
  const name = row.querySelector("td:nth-child(2)").textContent;
  const cardNo = row.querySelector("td:nth-child(3)").textContent;
  const servessId = row.querySelector("td:nth-child(4)").textContent;
  const areaId = row.querySelector("td:nth-child(5)").textContent;

  // عرض نافذة SweetAlert مع حقول التعديل
  Swal.fire({
    title: "تعديل بيانات المستخدم",
    html:
      `<input id="swal-input1" class="swal2-input" placeholder="الاسم" value="${name}">` +
      `<input id="swal-input2" class="swal2-input" placeholder="رقم البطاقة" value="${cardNo}">` +
      `<input id="swal-input3" class="swal2-input" placeholder="معرف الخدمة" value="${servessId}">` +
      `<input id="swal-input4" class="swal2-input" placeholder="معرف المنطقة" value="${areaId}">`,
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonText: "حفظ التعديلات",
    cancelButtonText: "إلغاء",
    preConfirm: () => {
      return {
        name: document.getElementById("swal-input1").value,
        EmpCerd: document.getElementById("swal-input2").value,
        Salary: document.getElementById("swal-input3").value,
        Manage: document.getElementById("swal-input4").value,
      };
    },
  }).then((result) => {
    if (result.isConfirmed) {
      const updatedData = result.value;

      // إرسال البيانات المحدثة إلى الخادم
      fetch(`http://localhost/api/update_emp.php?id=${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === "success") {
            Swal.fire("تم!", "تم تحديث بيانات المستخدم بنجاح", "success");
            // تحديث الصف في الجدول
            row.querySelector("td:nth-child(2)").textContent = updatedData.name;
            row.querySelector("td:nth-child(3)").textContent =
              updatedData.cardNo;
            row.querySelector("td:nth-child(4)").textContent =
              updatedData.servessId;
            row.querySelector("td:nth-child(5)").textContent =
              updatedData.areaId;
          } else {
            Swal.fire("خطأ!", "فشل في تحديث البيانات", "error");
          }
        })
        .catch((error) => {
          Swal.fire("خطأ!", "حدث خطأ أثناء الاتصال بالخادم", "error");
        });
    }
  });
}

// ! ---------------------- add_payment------------------------------------------
document
.getElementById("paymentForm")
.addEventListener("submit", function (e) {
  e.preventDefault(); // منع إعادة تحميل الصفحة

  const paymentData = {
    us_Id: document.getElementById("user").value,
    amount: document.getElementById("amount").value,
    method: document.getElementById("method").value,
    payment_date: document.getElementById("payment_date").value,
  };
  console.log(paymentData);
  fetch("http://localhost/api/insert_payment.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(paymentData),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "success") {
        Swal.fire("تم!","تم إدخال بيانات الدفع بنجاح" ,"success")
        document.getElementById("paymentForm").reset(); // إعادة تعيين النموذج
      } else {
        // alert("فشل إدخال بيانات الدفع: " + data.message);
        Swal.fire("خطأ!", "فشل إدخال بيانات الدفع: " +data.message, "error");
      }
    })
    .catch((error) =>     Swal.fire("خطأ!", "فشل في  "+error  , "error"));

});
// ! ----------------------print------------------------------------------

function printInvoice(userId, userName, paymentMethod, paymentAmount, paymentDate) {  
  const printWindow = window.open('', '_blank');  
  printWindow.document.write(`  
      <html>  
      <head>  
          <title>فاتورة</title>  
              <link href="./css/bootstrap.rtl.min.css" rel="stylesheet" />
          <style>  
              body { font-family: Arial, sans-serif; }  
              .invoice { margin: 20px; }  
              .card { margin-bottom: 20px; }  
              h2 { text-align: center; }  
              table { width: 100%; border-collapse: collapse; }  
              th, td { border: 1px solid #ddd; padding: 8px; }  
              th { background-color: #f2f2f2; }  
          </style>  
      </head>  
      <body>  
          <div class="invoice">  
              <div class="card text-center">  
                  <div class="card-header">فاتورة الدفع</div>  
                  <div class="card-body">  
                      <table class="table bg-white rounded shadow-sm table-hover">  
                          <thead>  
                              <tr>  
                                  <th>الاسم</th>  
                                  <th>طريقة الدفع</th>  
                                  <th>المبلغ المدفوع</th>  
                                  <th>تاريخ الدفع</th>  
                              </tr>  
                          </thead>  
                          <tbody>  
                              <tr data-id="${userId}">  
                                  <td>${userName}</td>  
                                  <td>${paymentMethod}</td>  
                                  <td>${paymentAmount}</td>  
                                  <td>${paymentDate}</td>  
                              </tr>  
                          </tbody>  
                      </table>  
                  </div>  
                  <div class="card-footer text-body-secondary">  
                      <button class="btn btn-primary" onclick="window.print()">طباعة</button>  
                  </div>  
              </div>  
          </div>  
      <script src="./jquery-3.6.0.js"></script>
    <script src="./bootstrap.bundle.min.js"></script>
      </body>  
      </html>  
  `);  
  printWindow.document.close();  
}
