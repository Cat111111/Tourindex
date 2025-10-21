'use client'
import React from "react"
import Link from "next/link"

export default function Landing(){
  return(
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center justify-center text-center px-6">
      <div className="max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">
          Tourindex
        </h1>
        <p className="text-lg text-gray-700 mb-8 leading-relaxed">
          Οι δείκτες βιώσιμου τουρισμού με ανθρώπινη λογική.  
          Ένα απλό εργαλείο που μετρά και απεικονίζει την πραγματική απόδοση κάθε προορισμού — οικονομικά, περιβαλλοντικά και κοινωνικά.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/dashboard" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition font-medium">
            Δες το Demo
          </Link>
          <Link href="/login" className="border border-blue-600 text-blue-700 hover:bg-blue-50 px-6 py-3 rounded-xl transition font-medium">
            Ξεκίνα Δωρεάν
          </Link>
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-6 text-left">
          <div className="p-5 bg-white rounded-2xl shadow-sm border border-gray-100">
            <h3 className="font-semibold text-blue-800 mb-2">Απλή Εικόνα</h3>
            <p className="text-sm text-gray-600">
              Όλα σε ένα ραντάρ. Δείκτες για οικονομία, περιβάλλον, ικανοποίηση, κοινωνία και ανθεκτικότητα.
            </p>
          </div>
          <div className="p-5 bg-white rounded-2xl shadow-sm border border-gray-100">
            <h3 className="font-semibold text-blue-800 mb-2">Ευφυείς Υπολογισμοί</h3>
            <p className="text-sm text-gray-600">
              Αυτόματη στάθμιση βαρών και στόχων — το εργαλείο βρίσκει μόνο του το σημείο ισορροπίας.
            </p>
          </div>
          <div className="p-5 bg-white rounded-2xl shadow-sm border border-gray-100">
            <h3 className="font-semibold text-blue-800 mb-2">Έτοιμο για Ανάλυση</h3>
            <p className="text-sm text-gray-600">
              Εξαγωγή, αποθήκευση και σενάρια ανά προορισμό. Όλα σε πραγματικό χρόνο.
            </p>
          </div>
        </div>

        <footer className="mt-20 text-sm text-gray-500">
          © {new Date().getFullYear()} Tourindex — δίκτυο βιώσιμης τουριστικής πληροφορίας
        </footer>
      </div>
    </main>
  )
}
