export const MOCK_BASIC_HTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      background: #f5f5f5;
    }
  </style>
</head>
<body>
  <div id="root"></div>
  <div id='top-level'></div>
  <script src="./script1.js"></script>
  <script src="./nomodule.js" nomodule></script>
  <script src="./module.js" type='module'></script>
</body>
</html>
`

export const MOCK_APP_HTML = `
<!DOCTYPE html>
<html lang="en">
<micro-app-head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      background: #f5f5f5;
    }
  </style>
</micro-app-head>
<micro-app-body>
  <div id="root"></div>
  <div id='top-level'></div>
  <script src="./script1.js"></script>
  <script src="./nomodule.js" nomodule></script>
  <script src="./module.js" type='module'></script>
</micro-app-body>
</html>
`
