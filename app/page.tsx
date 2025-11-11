export default function Home() {
  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-2 text-gray-900">
          Backend API - Undangan Wisuda
        </h1>
        <p className="text-gray-600 mb-8">
          Backend API for graduation invitation management system
        </p>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            API Endpoints
          </h2>

          <div className="space-y-6">
            {/* Authentication */}
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                🔐 Authentication
              </h3>
              <div className="space-y-2 ml-4">
                <div className="p-3 bg-blue-50 rounded">
                  <code className="text-sm">POST /api/auth/login</code>
                  <p className="text-sm text-gray-600 mt-1">
                    Login with access code
                  </p>
                </div>
                <div className="p-3 bg-blue-50 rounded">
                  <code className="text-sm">GET /api/auth/session</code>
                  <p className="text-sm text-gray-600 mt-1">
                    Verify session token
                  </p>
                </div>
              </div>
            </div>

            {/* Wisudawan */}
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                👨‍🎓 Wisudawan
              </h3>
              <div className="space-y-2 ml-4">
                <div className="p-3 bg-green-50 rounded">
                  <code className="text-sm">GET /api/wisudawan</code>
                  <p className="text-sm text-gray-600 mt-1">
                    Get all wisudawan
                  </p>
                </div>
                <div className="p-3 bg-green-50 rounded">
                  <code className="text-sm">GET /api/wisudawan/:id</code>
                  <p className="text-sm text-gray-600 mt-1">
                    Get wisudawan by ID
                  </p>
                </div>
              </div>
            </div>

            {/* Invitations */}
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                📧 Invitations
              </h3>
              <div className="space-y-2 ml-4">
                <div className="p-3 bg-purple-50 rounded">
                  <code className="text-sm">
                    GET /api/invitations?wisudawanId=:id
                  </code>
                  <p className="text-sm text-gray-600 mt-1">
                    Get all invitations for a wisudawan
                  </p>
                </div>
                <div className="p-3 bg-purple-50 rounded">
                  <code className="text-sm">POST /api/invitations</code>
                  <p className="text-sm text-gray-600 mt-1">
                    Create new invitation
                  </p>
                </div>
                <div className="p-3 bg-purple-50 rounded">
                  <code className="text-sm">DELETE /api/invitations/:id</code>
                  <p className="text-sm text-gray-600 mt-1">
                    Delete invitation
                  </p>
                </div>
                <div className="p-3 bg-purple-50 rounded">
                  <code className="text-sm">
                    GET /api/invitations/validate?wisudawanId=:id&tamuSlug=:slug
                  </code>
                  <p className="text-sm text-gray-600 mt-1">
                    Validate invitation link
                  </p>
                </div>
              </div>
            </div>

            {/* Quota */}
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                📊 Quota
              </h3>
              <div className="space-y-2 ml-4">
                <div className="p-3 bg-yellow-50 rounded">
                  <code className="text-sm">
                    GET /api/quota?wisudawanId=:id
                  </code>
                  <p className="text-sm text-gray-600 mt-1">
                    Get quota information
                  </p>
                </div>
              </div>
            </div>

            {/* Admin */}
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                ⚙️ Admin
              </h3>
              <div className="space-y-2 ml-4">
                <div className="p-3 bg-red-50 rounded">
                  <code className="text-sm">POST /api/init</code>
                  <p className="text-sm text-gray-600 mt-1">
                    Initialize database with default wisudawan data
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Database Info
          </h2>
          <div className="space-y-2 text-gray-700">
            <p>
              <strong>Database:</strong> undangan
            </p>
            <p>
              <strong>Collections:</strong>
            </p>
            <ul className="list-disc list-inside ml-4">
              <li>wisudawan - Graduate information and access codes</li>
              <li>invitations - Created invitations with guest names</li>
            </ul>
          </div>
        </div>

        <div className="mt-6 text-center text-gray-500 text-sm">
          <p>Backend API v1.0.0 - Wisuda FFB 2025</p>
        </div>
      </div>
    </main>
  );
}
