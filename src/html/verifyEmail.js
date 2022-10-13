exports.htmlVerifyEmail = (name, code) => {
    return ` <html>
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous">
        <title>XÁC THỰC TÀI KHOẢN</title>
    </head>
    <body style=" font-family: Arial, Helvetica, sans-serif;color: #212529;">
        <header class="container-fluid" style="background-color: #F0BD71; text-align: center;">
            <h2 style="padding: 20px">TIỆM MỸ PHẨM NHÀ NHƠN</h2>
        </header>
        <main style="color: #212529;">
            <br />
            <div style="padding-bottom:20px">
                <div style="color: #212529;text-align: center; font-weight: bold; font-size: 28px; ">
                    XÁC NHẬN KÍCH HOẠT TÀI KHOẢN
                </div>
                <br>
                <div style="color: #212529;width: 600px; margin: auto; text-align: justify; font-size: 16px;">
                    Xin chào: <p style="display: inline; font-weight: bold">${name}</p> <br><br>
                    Anh/Chị đã đăng ký tài khoản thành công. Vui lòng nhập mã code <p style="display: inline; font-weight: bold;">"${code}"</p> để được kích hoạt tài khoản. <br> <br>
                    Nếu Anh/Chị có thắc mắc hãy liên hệ ngay Hotline (+84) 33 712 2712 để được hỗ trợ nhanh nhất. <br><br>
                    Thân mến, chúc Anh/Chị một ngày tốt lành <br>
                    <p style="display: inline; font-weight: bold;">Mỹ phẩm nhà Nhơn</p>
                    <hr style="margin-top: 30px;margin-bottom: 40px;"/>
                </div>
              
            </div>
        </main>
        <div class="container-fluid" style="background-color: #F5F5F5; text-align: center;padding:20px">
          
            (+84) 8 1949 0540 <br>
            info@vndigitech.com <br>
            VP: Tòa nhà SBI, Lô 6B, ĐS 03, QTSC, P. Tân Cánh Hiệp, Q.12, TP.HCM <br>
            Trụ sở: E9, A2, KDC Tín Phong, P. Tân Thới Nhất, Q 12, TP.HCM <br><br>
            Copyright @ 2022 hiendev All rights reserved <br>
            Contact email: hientranvan27@gmail.com <br>
        </div>
      </body>
    </html>
   `;
};

// <div  style="text-align: center;margin-top: 20px;margin-bottom: 20px;">
//     <a style="border-radius: 5px;font-weight: 600;padding: 18px;background-color: #F0BD71;font-size:18px;color: #fff;text-decoration: none;cursor: pointer;" href="${linApi}">Xác nhận</a>
// </div>
