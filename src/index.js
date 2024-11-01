import app from './app'

app.listen(app.get('port'), () => {
    console.log('Listening on port 3000')
})
