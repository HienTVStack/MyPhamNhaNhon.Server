exports.updateStatusInvoice = (name, idInvoice) => {
    return ` <html>
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous">
        <title>Cập nhận trạng thái đơn hàng</title>
    </head>
    <body style=" font-family: Arial, Helvetica, sans-serif;color: #212529;">
        <header class="container-fluid" style="background-color: #F0BD71; text-align: center;">
            <h2 style="padding: 20px">TIỆM MỸ PHẨM NHÀ NHƠN</h2>
        </header>
        <main style="color: #212529;">
            <br />
            <div style="padding-bottom:20px">
                <div style="color: #212529;text-align: center; font-weight: bold; font-size: 28px; ">
                    CẬP NHẬT TRẠNG THÁI ĐƠN HÀNG
                </div>
                <br>
                <div style="color: #212529;width: 600px; margin: auto; text-align: justify; font-size: 16px;">
                    Xin chào: <p style="display: inline; font-weight: bold">${name}</p> <br><br>
                    Tiệm mỹ phẩm nhà Nhơn đã xác nhận đơn hàng với mã đơn <b>${idInvoice}</b> <br/>
                    Đơn hàng sẽ được giao đến quý khách trong vài ngày tới <br /> <br />
                    Nếu cần hỗ trợ hãy liên hệ với chúng tôi trước khi đơn hàng được giao <br />
                    Thân mến, chúc Anh/Chị một ngày tốt lành <br>
                    <p style="display: inline; font-weight: bold;">Mỹ phẩm nhà Nhơn</p>
                    <hr style="margin-top: 30px;margin-bottom: 40px;"/>
                </div>
            </div>
        </main>
        <div class="container-fluid" style="background-color: #F5F5F5; text-align: center;padding:20px">
            (+84) 33 712 2712<br>
            admin@nhanhon.com <br>
            Địa chỉ: Thôn Khương Mỹ, xã Tam Xuân 1, huyện Núi Thành, tỉnh Quảng Nam
            Copyright@2022 Trần Văn Hiền<br>
            Contact email: hientranvan27@gmail.com <br>
        </div>
      </body>
    </html>
   `;
};
