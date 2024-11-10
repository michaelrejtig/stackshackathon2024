;; Simple Clarity contract to print "hello"

(define-public (say-hello)
  (begin
    ;; Print "hello" to the console
    (print "hello")
    (ok "Hello has been printed")
  )
)
